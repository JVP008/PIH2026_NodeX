import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { normalizeText } from '@/lib/utils';
import { DisputePayload } from '@/types/api';

export const dynamic = 'force-dynamic';

const allowedDisputeTypes = new Set(['refund', 'quality', 'noshow', 'payment', 'other']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handle GET requests to fetch all disputes and their related contexts.
 * Contains relations for booking details and contractor information.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('disputes')
      .select('*, booking:bookings(time, date, contractor:contractors(name, service))');

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching disputes:', error);
    return NextResponse.json({ error: 'Error fetching disputes' }, { status: 500 });
  }
}

/**
 * Handle POST requests to submit a new dispute.
 * Includes strict validation for types, emails, and mandatory descriptions.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid dispute payload' }, { status: 400 });
    }

    const payload = body as DisputePayload;

    const type = normalizeText(payload.type);
    if (!type || !allowedDisputeTypes.has(type)) {
      return NextResponse.json({ error: 'Invalid dispute type' }, { status: 400 });
    }

    const description = normalizeText(payload.description);
    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const email = normalizeText(payload.email);
    if (email && !emailPattern.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const insertPayload = {
      booking_id: normalizeText(payload.booking_id),
      name: normalizeText(payload.name),
      email: email ? email.toLowerCase() : null,
      type,
      description,
      user_id: normalizeText(payload.user_id),
    };

    // Save dispute and return inserted record
    const { data, error } = await supabase.from('disputes').insert([insertPayload]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error creating dispute:', error);
    return NextResponse.json({ error: 'Error creating dispute' }, { status: 500 });
  }
}
