import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';
import { seedContractors } from '@/lib/seedContractors';
import { Contractor } from '@/types';

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
  let contractors: Contractor[] = seedContractors;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('contractors').select('*');

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Deduplicate by name (case-insensitive and trimmed)
        const uniqueNames = new Set<string>();
        const deduplicated: Contractor[] = [];
        for (const contractorRecord of data) {
          const nameKey = (contractorRecord.name || '').toLowerCase().trim();
          if (!uniqueNames.has(nameKey)) {
            uniqueNames.add(nameKey);
            deduplicated.push(contractorRecord);
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
