import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import {normalizeText } from '@/lib/utils';
import { BookingPayload } from '@/types/api';

export const dynamic = 'force-dynamic';

const allowedStatuses = new Set(['upcoming', 'completed', 'cancelled', 'pending']);

/**
 * Handle GET requests to fetch all bookings with contractor info.
 * Provides a sorted list for UI display.
 */
export async function GET() {
  try {
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*, contractor:contractors(name, image)')
      .order('date', { ascending: false });

    if (fetchError) throw fetchError;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

/**
 * Handle POST requests to create a new booking.
 * Validates payload, checks contractor availability, and registers the booking.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid booking payload' }, { status: 400 });
    }

    const payload = body as BookingPayload;

    // Validate required datetime fields
    const date = normalizeText(payload.date);
    const time = normalizeText(payload.time);

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    // Safely parse contractor ID to integer
    const parsedContractorId =
      typeof payload.contractor_id === 'number'
        ? payload.contractor_id
        : typeof payload.contractor_id === 'string'
          ? Number.parseInt(payload.contractor_id, 10)
          : null;

    if (!Number.isInteger(parsedContractorId) || Number(parsedContractorId) <= 0) {
      return NextResponse.json({ error: 'A valid contractor_id is required' }, { status: 400 });
    }

    // Validate optional status
    const status = normalizeText(payload.status);
    if (status && !allowedStatuses.has(status)) {
      return NextResponse.json({ error: 'Invalid booking status' }, { status: 400 });
    }

    // Validate optional price
    let finalPrice: number | null = null;
    if (payload.price !== undefined && payload.price !== null) {
      const numericPrice = Number(payload.price);
      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return NextResponse.json({ error: 'Price must be a non-negative number' }, { status: 400 });
      }
      finalPrice = numericPrice;
    }

    const insertPayload = {
      contractor_id: Number(parsedContractorId),
      date,
      time,
      notes: normalizeText(payload.notes),
      status: status || 'upcoming',
      price: finalPrice,
      user_id: normalizeText(payload.user_id),
    };

    // Prevent double-booking the professional for the same exact date/time
    // Allows re-booking if the previous conflicting slot was cancelled/completed
    const { data: existingSlots, error: existingSlotError } = await supabase
      .from('bookings')
      .select('id')
      .eq('contractor_id', insertPayload.contractor_id)
      .eq('date', insertPayload.date)
      .eq('time', insertPayload.time)
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

    // Insert booking into the database
    const { data, error: createError } = await supabase
      .from('bookings')
      .insert([insertPayload])
      .select();

    if (createError) throw createError;

    // Immediately mark the professional as unavailable if the newly created booking occupies them
    if (insertPayload.status === 'upcoming' || insertPayload.status === 'pending') {
      const { error: availabilityError } = await supabase
        .from('contractors')
        .update({ available: false })
        .eq('id', insertPayload.contractor_id);

      if (availabilityError) {
        throw availabilityError;
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}
