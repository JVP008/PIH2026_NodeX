import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabaseClient';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MAX_MESSAGE_LENGTH = 1000;

const isNonEmptyString = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0;

const SERVICE_LIST = ['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Landscaping'];

const APP_FEATURES = `
App name: HouseConnect Pro
Purpose: Connects Indian homeowners with verified local service professionals.
Available service categories: ${SERVICE_LIST.join(', ')}.
Key pages: Home, Browse Contractors, Post a Job (register as a professional), My Bookings, Report a Dispute, About, Login.
Booking flow: Users browse contractors → click "Book Now" → pick date & time slot → confirm booking.
Payment: Demo payment via the Bookings page (marks booking as completed).
Dispute system: Users can report issues (quality, no-show, refund, payment, other) from the Disputes page.
AI features: Auto-write description when posting a job, and this chat assistant.
`.trim();

// ---------- helpers to build live context from Supabase ----------

interface ContractorRow {
    name: string | null;
    service: string | null;
    rating: number | null;
    completed_jobs: number | null;
    location: string | null;
    price: string | null;
    available: boolean | null;
    verified: boolean | null;
}

const formatContractors = (rows: ContractorRow[]) =>
    rows
        .map(
            (c) =>
                `• ${c.name} | ${c.service} | Rating ${c.rating ?? '–'} | ${c.completed_jobs ?? 0} jobs | ${c.location ?? 'N/A'} | ${c.price ?? 'Contact'} | ${c.available ? 'Available' : 'Busy'} | ${c.verified ? 'Verified' : 'Unverified'}`
        )
        .join('\n');

async function fetchAppContext() {
    // Fire all queries in parallel for speed.
    const [contractorsRes, bookingsRes, disputesRes, jobsRes] = await Promise.all([
        supabase.from('contractors').select('*').limit(30),
        supabase.from('bookings').select('id, date, time, status, price, contractor:contractors(name, service)').order('created_at', { ascending: false }).limit(10),
        supabase.from('disputes').select('id, type, status, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('jobs').select('*').order('created_at', { ascending: false }).limit(10),
    ]);

    if (contractorsRes.error) throw contractorsRes.error;

    const contractors: ContractorRow[] = contractorsRes.data ?? [];
    const bookings = bookingsRes.data ?? [];
    const disputes = disputesRes.data ?? [];
    const jobs = jobsRes.data ?? [];

    let context = `=== APPLICATION DATA (live from database) ===\n\n`;
    context += `--- App Info ---\n${APP_FEATURES}\n\n`;

    context += `--- Contractors (${contractors.length}) ---\n`;
    context += contractors.length > 0 ? formatContractors(contractors) : 'None registered yet.';
    context += '\n\n';

    context += `--- Recent Bookings (${bookings.length}) ---\n`;
    context += bookings.length > 0
        ? bookings.map((b) => {
            const c = b.contractor as { name?: string; service?: string } | null;
            return `• Booking ${b.id?.slice(0, 8)}… | ${c?.name ?? 'Unknown'} (${c?.service ?? '–'}) | ${b.date} ${b.time} | Status: ${b.status} | ₹${b.price ?? '–'}`;
        }).join('\n')
        : 'No bookings yet.';
    context += '\n\n';

    context += `--- Recent Disputes (${disputes.length}) ---\n`;
    context += disputes.length > 0
        ? disputes.map((d) => `• ${d.type} — ${d.status}`).join('\n')
        : 'No disputes filed.';
    context += '\n\n';

    context += `--- Recent Jobs Posted (${jobs.length}) ---\n`;
    context += jobs.length > 0
        ? jobs.map((j) => `• ${j.title ?? 'Untitled'} | ${j.service ?? j.category ?? '–'} | ${j.location} | ${j.status ?? j.urgency ?? '–'}`).join('\n')
        : 'No jobs posted yet.';

    return { context, contractors };
}

// ---------- fallback (no Gemini key) ----------

const buildFallbackReply = (message: string, contractors: ContractorRow[]) => {
    const lower = message.toLowerCase();

    // Detect greetings.
    if (/^(hi|hello|hey|namaste|howdy)\b/.test(lower)) {
        return `Hello! 👋 I'm the HouseConnect Pro assistant. I can help you find contractors, check bookings, or explain how the app works. What do you need?`;
    }

    // Detect service-related queries.
    const matchedService = SERVICE_LIST.find((s) => lower.includes(s.toLowerCase()));
    if (matchedService) {
        const matches = contractors
            .filter((c) => c.service?.toLowerCase() === matchedService.toLowerCase() && c.available)
            .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));

        if (matches.length === 0) {
            return `We currently don't have any available ${matchedService} professionals. Please check back soon or browse other categories on the Contractors page.`;
        }

        const top = matches.slice(0, 3);
        const lines = top.map((c) => `• ${c.name} — Rating ${c.rating}, ${c.location}, ${c.price}`);
        return `Here are our top ${matchedService} professionals:\n${lines.join('\n')}\n\nYou can book them from the Contractors page!`;
    }

    // Detect location queries.
    const locationMatch = contractors.find((c) => c.location && lower.includes(c.location.toLowerCase().split(',')[0]));
    if (locationMatch) {
        const cityPart = locationMatch.location!.split(',')[0];
        const inCity = contractors.filter((c) => c.location?.toLowerCase().includes(cityPart.toLowerCase()) && c.available);
        if (inCity.length > 0) {
            const lines = inCity.slice(0, 3).map((c) => `• ${c.name} — ${c.service}, Rating ${c.rating}`);
            return `Professionals available in ${cityPart}:\n${lines.join('\n')}\n\nVisit the Contractors page to book.`;
        }
    }

    // Detect app-feature questions.
    if (lower.includes('book') || lower.includes('appointment')) {
        return 'To book a professional: go to the Contractors page → click "Book Now" on any available pro → pick a date and time slot → confirm. You can view and manage bookings on the My Bookings page.';
    }
    if (lower.includes('dispute') || lower.includes('report') || lower.includes('complaint')) {
        return 'You can report issues from the Disputes page. Fill in your name, select the issue type (quality, no-show, refund, payment, or other), describe the problem, and submit. Our team reviews disputes within 24 hours.';
    }
    if (lower.includes('post') || lower.includes('register') || lower.includes('list my')) {
        return 'To register as a professional: go to the "Post a Job" page, fill in your name, mobile number, service category, location, and optionally your hourly rate and description. You can even use the AI Auto-write button to generate a description!';
    }

    return `I can only answer questions about HouseConnect Pro — our contractors, bookings, services (${SERVICE_LIST.join(', ')}), and app features. Try asking something like "Show me plumbers in Mumbai" or "How do I book a pro?".`;
};

// ---------- main handler ----------

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!isNonEmptyString(message)) {
            return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
        }

        const trimmedMessage = message.trim();

        if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.` },
                { status: 400 }
            );
        }

        // Pull live app data from Supabase.
        const { context, contractors } = await fetchAppContext();

        // ---- Fallback mode (no Gemini key) ----
        if (!genAI) {
            return NextResponse.json({ reply: buildFallbackReply(trimmedMessage, contractors) });
        }

        // ---- Gemini mode ----
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are the built-in AI assistant for "HouseConnect Pro".

STRICT RULES:
1. You must ONLY answer questions using the APPLICATION DATA provided below. This is your single source of truth.
2. If the user asks something NOT covered by the data below (e.g. general knowledge, weather, coding, politics, math, jokes), politely say: "I can only help with questions about HouseConnect Pro — our contractors, bookings, services, and app features."
3. NEVER invent or hallucinate contractors, bookings, prices, or any data that is not explicitly listed below.
4. When recommending a contractor, always mention their name, service, rating, location, and price exactly as listed.
5. Be concise (max 3-4 sentences). Use a friendly, professional tone.
6. If the user greets you, greet back briefly and tell them what you can help with.

${context}

=== USER QUESTION ===
${trimmedMessage}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ reply: text.trim() });
    } catch {
        return NextResponse.json(
            { error: 'Failed to process request. Please try again later.' },
            { status: 500 }
        );
    }
}
