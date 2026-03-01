import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const allowedStatuses = new Set(['upcoming', 'completed', 'cancelled', 'pending']);

export async function GET() {
  try {
    // Read bookings and include basic contractor info for UI cards.
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*, contractor:contractors(name, image)')
      .order('date', { ascending: false });

    if (fetchError) throw fetchError;

    return NextResponse.json({ data });
  } catch (error) {
    // Return a clear server error message when fetch fails.
    // eslint-disable-next-line no-console
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Read new booking payload sent by the browser.
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid booking payload' }, { status: 400 });
    }

    const { contractor_id, date, time, notes, status, price, user_id } = body as Record<
      string,
      unknown
    >;

    if (!isNonEmptyString(date) || !isNonEmptyString(time)) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    const parsedContractorId =
      typeof contractor_id === 'number'
        ? contractor_id
        : typeof contractor_id === 'string'
          ? Number.parseInt(contractor_id, 10)
          : null;

    if (!Number.isInteger(parsedContractorId) || Number(parsedContractorId) <= 0) {
      return NextResponse.json({ error: 'A valid contractor_id is required' }, { status: 400 });
    }

    if (status && (!isNonEmptyString(status) || !allowedStatuses.has(status))) {
      return NextResponse.json({ error: 'Invalid booking status' }, { status: 400 });
    }

    if (price !== undefined && price !== null) {
      const numericPrice = Number(price);
      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return NextResponse.json({ error: 'Price must be a non-negative number' }, { status: 400 });
      }
    }

    const insertPayload = {
      contractor_id: Number(parsedContractorId),
      date: date.trim(),
      time: time.trim(),
      notes: isNonEmptyString(notes) ? notes.trim() : null,
      status: isNonEmptyString(status) ? status : 'upcoming',
      price: price === undefined || price === null ? null : Number(price),
      user_id: isNonEmptyString(user_id) ? user_id : null,
    };

    // Prevent double-booking the same professional for the same date/time
    // while allowing re-booking when previous slots were cancelled/completed.
    const { data: existingSlots, error: existingSlotError } = await supabase
      .from('bookings')
      .select('id')
      .eq('contractor_id', Number(parsedContractorId))
      .eq('date', date.trim())
      .eq('time', time.trim())
      .in('status', ['upcoming', 'pending'])
      .limit(1);

    if (existingSlotError) {
      throw existingSlotError;
    }

    if (existingSlots && existingSlots.length > 0) {
      return NextResponse.json(
        { error: 'This professional is already booked for this date and time.' },
        { status: 409 }
      );
    }

    // Insert booking and return created row.
    const { data, error: createError } = await supabase
      .from('bookings')
      .insert([insertPayload])
      .select();

    if (createError) throw createError;

    // Mark the professional busy after a successful active booking.
    if (insertPayload.status === 'upcoming' || insertPayload.status === 'pending') {
      const { error: availabilityError } = await supabase
        .from('contractors')
        .update({ available: false })
        .eq('id', Number(parsedContractorId));

      if (availabilityError) {
        throw availabilityError;
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    // Send a predictable error shape for frontend handling.
    // eslint-disable-next-line no-console
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}
