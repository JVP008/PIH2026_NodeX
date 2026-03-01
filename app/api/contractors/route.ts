import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

/**
 * Handle GET requests to fetch available contractors.
 * Optionally filters by query param `?service=type`.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');

    // Build the Supabase query.
    // Always start with selecting all contractors, then chain filters.
    let query = supabase.from('contractors').select('*');

    if (service) {
      query = query.eq('service', service);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Error fetching contractors' }, { status: 500 });
  }
}
