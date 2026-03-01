import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  if (!genAI) {
    return NextResponse.json(
      { error: 'Gemini API is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const { title, service, location } = await req.json();

    if (!service || !location) {
      return NextResponse.json(
        { error: 'Service and location are required to generate a description.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Write a short, professional, 2-3 sentence description for a homeowner who wants to post a job on a modern contractor marketplace app in India. 
The user needs a "${service}" professional located in "${location}". 
${title ? `The title of their job is "${title}".` : ''}
Make it sound polite, direct, and clear. Do not include placeholders or generic advice, just output the description itself.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ description: text.trim() });
  } catch (error) {
    console.error('Error generating description with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to generate description. Please try again.' },
      { status: 500 }
    );
  }
}
