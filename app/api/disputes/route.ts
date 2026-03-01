import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch disputes with related booking and contractor context for support view.
    const { data, error } = await supabase
      .from('disputes')
      .select('*, booking:bookings(service, contractor:contractors(name))');

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    // Standard error response keeps frontend handling simple.
    return NextResponse.json({ error: 'Error fetching disputes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Parse dispute details from incoming request body.
    const body = await request.json();
    // Save dispute and return inserted record.
    const { data, error } = await supabase.from('disputes').insert([body]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    // Return clear failure message if database insert fails.
    return NextResponse.json({ error: 'Error creating dispute' }, { status: 500 });
  }
}
