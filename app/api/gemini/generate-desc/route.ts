import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
// Create AI client once; if key is missing, we use a local fallback generator.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MAX_FIELD_LENGTH = 200;

const normalizeText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const buildFallbackDescription = ({
  title,
  service,
  location,
}: {
  title: string;
  service: string;
  location: string;
}) => {
  const intro = title
    ? `${title} — experienced ${service} services available in ${location}.`
    : `Experienced ${service} services available in ${location}.`;

  return `${intro} Professional, on-time work with clear pricing and quality-focused execution for homes and small businesses.`;
};

export async function POST(req: Request) {
  try {
    // Read job details from frontend request.
    const { title, service, location } = await req.json();
    const normalizedTitle = normalizeText(title);
    const normalizedService = normalizeText(service);
    const normalizedLocation = normalizeText(location);

    // We need service and location to generate useful, context-specific text.
    if (!normalizedService || !normalizedLocation) {
      return NextResponse.json(
        { error: 'Service and location are required to generate a description.' },
        { status: 400 }
      );
    }

    if (
      normalizedService.length > MAX_FIELD_LENGTH ||
      normalizedLocation.length > MAX_FIELD_LENGTH ||
      normalizedTitle.length > MAX_FIELD_LENGTH
    ) {
      return NextResponse.json(
        { error: `Each input must be at most ${MAX_FIELD_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (!genAI) {
      return NextResponse.json({
        description: buildFallbackDescription({
          title: normalizedTitle,
          service: normalizedService,
          location: normalizedLocation,
        }),
      });
    }

    // Select the Gemini model used for short content generation.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prompt tells the model to produce short, professional India-focused copy.
    const prompt = `Write a short, professional, 2-3 sentence description for a homeowner who wants to post a job on a modern contractor marketplace app in India. 
  The user needs a "${normalizedService}" professional located in "${normalizedLocation}". 
  ${normalizedTitle ? `The title of their job is "${normalizedTitle}".` : ''}
Make it sound polite, direct, and clear. Do not include placeholders or generic advice, just output the description itself.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Return cleaned output so UI can place it directly in textarea.
    return NextResponse.json({ description: text.trim() });
  } catch {
    // Catch-all message avoids leaking internal errors to the client.
    return NextResponse.json(
      { error: 'Failed to generate description. Please try again.' },
      { status: 500 }
    );
  }
}
