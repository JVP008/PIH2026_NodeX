import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Parse job details sent from the post-job flow.
    const body = await request.json();
    // Store new job and return the created database row.
    const { data, error } = await supabase.from('jobs').insert([body]).select();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch {
    // Keep response format consistent with other API routes.
    return NextResponse.json({ error: 'Error creating job' }, { status: 500 });
  }
}
