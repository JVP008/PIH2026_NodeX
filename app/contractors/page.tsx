import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';
import { seedContractors } from '@/lib/seedContractors';

// Caching disabled to ensure real-time contractor updates
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// True when real Supabase credentials are configured.
const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

export default async function ContractorsPage() {
  // Try to fetch from Supabase; fall back to seed data if it fails or returns nothing
  let contractors = seedContractors;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('contractors').select('*');

      if (error) {
        console.warn(`[ContractorsPage] Supabase query error: ${error.message ?? 'unknown'}`);
      }

      if (data && data.length > 0) {
        // Deduplicate by name (case-insensitive and trimmed)
        const uniqueNames = new Set();
        const deduplicated = [];
        for (const req of data) {
          const nameKey = (req.name || '').toLowerCase().trim();
          if (!uniqueNames.has(nameKey)) {
            uniqueNames.add(nameKey);
            deduplicated.push(req);
          }
        }
        contractors = deduplicated;
      }
    } catch {
      // Supabase unreachable — silently fall back to seed data
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ContractorList initialContractors={contractors} />
    </div>
  );
}
