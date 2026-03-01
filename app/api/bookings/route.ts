import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Read bookings and include basic contractor info for UI cards.
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*, contractor:contractors(name, image)')
      .order('date', { ascending: false });

    if (fetchError) throw fetchError;

    return NextResponse.json({ data });
  } catch {
    // Return a clear server error message when fetch fails.
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Read new booking payload sent by the browser.
    const body = await request.json();
    // Insert booking and return created row.
    const { data, error: createError } = await supabase.from('bookings').insert([body]).select();

    if (createError) throw createError;

    return NextResponse.json({ data });
  } catch {
    // Send a predictable error shape for frontend handling.
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}
