import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabaseClient';

const apiKey = process.env.GEMINI_API_KEY;
// Build AI client once during module load for better performance.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
    if (!genAI) {
        return NextResponse.json(
            { error: 'Gemini API is not configured on the server.' },
            { status: 500 }
        );
    }

    try {
        // Read user question from chat request payload.
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
        }

        // Fetch current contractor data so AI recommendations stay grounded.
        const { data: contractors } = await supabase.from('contractors').select('*').limit(20);

        // Turn contractor records into plain text context for the AI prompt.
        const contextData = contractors
            ? contractors.map(c => `- ${c.name} (${c.service}): Rating ${c.rating}, ${c.completed_jobs} jobs done. Location: ${c.location}. Price: ${c.price}`).join('\n')
            : 'No contractors available.';

        // Use lightweight Gemini model for fast conversational responses.
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a helpful assistant for "HouseConnect Pro", an Indian app that connects homeowners with local professionals.
The user is asking: "${message}"

Here is a list of our currently available professionals:
${contextData}

Reply to the user in a friendly, helpful tone. Be concise (max 3 sentences). Recommend the best professional from the list above based on their query (match service, location, or rating if applicable). Do not make up professionals that are not on the list.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ reply: text.trim() });
    } catch {
        // Avoid leaking internal details while returning a user-friendly error.
        return NextResponse.json(
            { error: 'Failed to process request. Please try again later.' },
            { status: 500 }
        );
    }
}
