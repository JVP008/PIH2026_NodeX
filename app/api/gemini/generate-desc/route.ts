import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
// Create AI client once; if key is missing, requests are rejected gracefully.
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  if (!genAI) {
    return NextResponse.json(
      { error: 'Gemini API is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    // Read job details from frontend request.
    const { title, service, location } = await req.json();

    // We need service and location to generate useful, context-specific text.
    if (!service || !location) {
      return NextResponse.json(
        { error: 'Service and location are required to generate a description.' },
        { status: 400 }
      );
    }

    // Select the Gemini model used for short content generation.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prompt tells the model to produce short, professional India-focused copy.
    const prompt = `Write a short, professional, 2-3 sentence description for a homeowner who wants to post a job on a modern contractor marketplace app in India. 
The user needs a "${service}" professional located in "${location}". 
${title ? `The title of their job is "${title}".` : ''}
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
