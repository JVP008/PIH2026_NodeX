import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Read optional query string (for example: ?service=plumbing).
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');

    // Start with all contractors, then narrow down if a service was requested.
    let query = supabase.from('contractors').select('*');

    if (service) {
      query = query.eq('service', service);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    // Return a stable error payload for frontend error toasts.
    return NextResponse.json({ error: 'Error fetching contractors' }, { status: 500 });
  }
}
