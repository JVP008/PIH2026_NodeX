import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { normalizeText } from '@/lib/utils';
import { GenerateDescPayload } from '@/types/api';

const apiKey = process.env.GEMINI_API_KEY;
// Create AI client once; if key is missing, we use a local fallback generator.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MAX_FIELD_LENGTH = 200;

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

/**
 * Handle POST requests to generate a job description using Gemini AI.
 * Falls back to a generic description if no API key is present or on failure.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const payload = body as GenerateDescPayload;

    const normalizedTitle = normalizeText(payload.title) || '';
    const normalizedService = normalizeText(payload.service) || '';
    const normalizedLocation = normalizeText(payload.location) || '';

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
