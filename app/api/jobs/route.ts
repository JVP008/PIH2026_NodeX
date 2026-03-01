import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const normalizeText = (value: unknown): string | null => {
  if (!isNonEmptyString(value)) {
    return null;
  }
  return value.trim();
};

const isSchemaColumnError = (error: { message?: string } | null) =>
  Boolean(error?.message && /column .* does not exist/i.test(error.message));

export async function POST(request: Request) {
  try {
    // Parse job details sent from the post-job flow.
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid job payload' }, { status: 400 });
    }

    const {
      user_id,
      title,
      service,
      category,
      description,
      location,
      budget,
      budget_min,
      budget_max,
      status,
      urgency,
    } = body as Record<string, unknown>;

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
        { error: 'service/category, description, and location are required' },
        { status: 400 }
      );
    }

    const normalizedBudget = normalizeText(budget);
    const normalizedStatus = normalizeText(status);
    const normalizedUrgency = normalizeText(urgency);

    const modernPayload = {
      user_id: normalizeText(user_id),
      title: normalizeText(title),
      service: normalizedService ?? normalizedCategory,
      description: normalizedDescription,
      location: normalizedLocation,
      budget: normalizedBudget,
      status: normalizedStatus ?? normalizedUrgency,
    };

    const parsedBudgetMin =
      typeof budget_min === 'number'
        ? budget_min
        : typeof budget_min === 'string' && budget_min.trim().length > 0
          ? Number.parseInt(budget_min, 10)
          : null;

    const parsedBudgetMax =
      typeof budget_max === 'number'
        ? budget_max
        : typeof budget_max === 'string' && budget_max.trim().length > 0
          ? Number.parseInt(budget_max, 10)
          : null;

    const legacyPayload = {
      user_id: normalizeText(user_id),
      title: normalizeText(title),
      category: normalizedCategory ?? normalizedService,
      description: normalizedDescription,
      location: normalizedLocation,
      urgency: normalizedUrgency ?? normalizedStatus ?? 'flexible',
      budget_min: Number.isFinite(parsedBudgetMin) ? parsedBudgetMin : null,
      budget_max: Number.isFinite(parsedBudgetMax) ? parsedBudgetMax : null,
    };

    // Store new job and return the created database row.
    let { data, error } = await supabase.from('jobs').insert([modernPayload]).select();

    if (error && isSchemaColumnError(error)) {
      const hasLegacyBudget =
        legacyPayload.budget_min !== null || legacyPayload.budget_max !== null;

      if (!hasLegacyBudget && normalizedBudget) {
        const numericBudget = Number.parseInt(normalizedBudget.replace(/[^0-9]/g, ''), 10);
        if (Number.isFinite(numericBudget)) {
          legacyPayload.budget_min = numericBudget;
          legacyPayload.budget_max = numericBudget;
        }
      }

      ({ data, error } = await supabase.from('jobs').insert([legacyPayload]).select());
    }

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    // Keep response format consistent with other API routes.
    return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
  }
}
