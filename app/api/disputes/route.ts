import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { isNonEmptyString } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const allowedDisputeTypes = new Set(['refund', 'quality', 'noshow', 'payment', 'other']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    // Fetch disputes with related booking and contractor context for support view.
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid dispute payload' }, { status: 400 });
    }

    const { booking_id, name, email, type, description, user_id } = body as Record<string, unknown>;

    if (!isNonEmptyString(type) || !allowedDisputeTypes.has(type)) {
      return NextResponse.json({ error: 'Invalid dispute type' }, { status: 400 });
    }

    if (!isNonEmptyString(description)) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    if (email && (!isNonEmptyString(email) || !emailPattern.test(email.trim()))) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const insertPayload = {
      booking_id: isNonEmptyString(booking_id) ? booking_id : null,
      name: isNonEmptyString(name) ? name.trim() : null,
      email: isNonEmptyString(email) ? email.trim().toLowerCase() : null,
      type,
      description: description.trim(),
      user_id: isNonEmptyString(user_id) ? user_id : null,
    };

    // Save dispute and return inserted record.
    const { data, error } = await supabase.from('disputes').insert([insertPayload]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    // Return clear failure message if database insert fails.
    // eslint-disable-next-line no-console
    console.error('Error creating dispute:', error);
    return NextResponse.json({ error: 'Error creating dispute' }, { status: 500 });
  }
}
