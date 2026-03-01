import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { normalizeText } from '@/lib/utils';
import { JobPayload } from '@/types/api';

export const dynamic = 'force-dynamic';

/**
 * Handle POST requests to post a new job request.
 * Normalizes inputs and ensures all mandatory fields exist.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid job payload' }, { status: 400 });
    }

    const payload = body as JobPayload;

    const normalizedDescription = normalizeText(payload.description);
    const normalizedLocation = normalizeText(payload.location);
    const normalizedService = normalizeText(payload.service);
    const normalizedCategory = normalizeText(payload.category);

    if (
      !normalizedDescription ||
      !normalizedLocation ||
      (!normalizedService && !normalizedCategory)
    ) {
      return NextResponse.json(
        { error: 'Service/category, description, and location are required' },
        { status: 400 }
      );
    }

    const insertPayload = {
      user_id: normalizeText(payload.user_id),
      title: normalizeText(payload.title),
      service: normalizedService ?? normalizedCategory ?? 'General',
      category: normalizedCategory ?? normalizedService ?? 'General',
      description: normalizedDescription,
      location: normalizedLocation,
      budget: normalizeText(payload.budget),
      status: normalizeText(payload.status) ?? normalizeText(payload.urgency) ?? 'open',
      urgency: normalizeText(payload.urgency) ?? 'flexible',
    };

    // Insert new job mapping
    const { data, error } = await supabase.from('jobs').insert([insertPayload]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
  }
}
