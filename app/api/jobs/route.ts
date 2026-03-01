import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { isNonEmptyString, normalizeText } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid job payload' }, { status: 400 });
    }

    const { user_id, title, service, category, description, location, budget, status, urgency } =
      body as Record<string, unknown>;

    const normalizedDescription = normalizeText(description);
    const normalizedLocation = normalizeText(location);
    const normalizedService = normalizeText(service);
    const normalizedCategory = normalizeText(category);

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

    const payload = {
      user_id: normalizeText(user_id),
      title: normalizeText(title),
      service: normalizedService ?? normalizedCategory ?? 'General',
      category: normalizedCategory ?? normalizedService ?? 'General',
      description: normalizedDescription,
      location: normalizedLocation,
      budget: normalizeText(budget),
      status: normalizeText(status) ?? normalizeText(urgency) ?? 'open',
      urgency: normalizeText(urgency) ?? 'flexible',
    };

    const { data, error } = await supabase.from('jobs').insert([payload]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
  }
}
