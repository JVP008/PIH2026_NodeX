import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';
import { seedContractors } from '@/lib/seedContractors';

// Caching allowed for better performance

export const dynamic = 'force-dynamic';

export default async function ContractorsPage() {
  // Try to fetch from Supabase; fall back to seed data if it fails or returns nothing
  let contractors = seedContractors;
  try {
    const { data } = await supabase.from('contractors').select('*');
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
    // Supabase unavailable — fallback to seed data
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ContractorList initialContractors={contractors} />
    </div>
  );
}
