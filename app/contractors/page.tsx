import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';
import { seedContractors } from '@/lib/seedContractors';

// Caching allowed for better performance

export default async function ContractorsPage() {
  // Try to fetch from Supabase; fall back to seed data if it fails or returns nothing
  let contractors = seedContractors;
  try {
    const { data } = await supabase.from('contractors').select('*');
    if (data && data.length > 0) {
      // Merge: add any Supabase records that aren't already in seed data by ID or Name
      const seedIds = new Set(seedContractors.map((c) => String(c.id)));
      const seedNames = new Set(seedContractors.map((c) => (c.name || '').toLowerCase().trim()));

      const extraFromDb = data.filter((c) => {
        const isDuplicateId = seedIds.has(String(c.id));
        const isDuplicateName = seedNames.has((c.name || '').toLowerCase().trim());
        return !isDuplicateId && !isDuplicateName;
      });
      contractors = [...seedContractors, ...extraFromDb];
    }
  } catch {
    // Supabase unavailable — seed data already set above
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ContractorList initialContractors={contractors} />
    </div>
  );
}
