import { supabase } from '@/lib/supabaseClient';
import ContractorList from '@/components/contractors/ContractorList';
import { seedContractors } from '@/lib/seedContractors';

// Caching disabled to ensure real-time contractor updates
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function ContractorsPage() {
  // Try to fetch from Supabase; fall back to seed data if it fails or returns nothing
  let contractors = seedContractors;
  try {
    const { data, error } = await supabase.from('contractors').select('*');

    if (error) {
      const errMsg = typeof error === 'object' ? (error as any).message : String(error);
      const errCode = typeof error === 'object' ? (error as any).code : 'N/A';
      console.error(`Supabase SSR Error on ContractorsPage: ${errMsg} (code: ${errCode})`);
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
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`Unexpected SSR Error on ContractorsPage: ${errMsg}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ContractorList initialContractors={contractors} />
    </div>
  );
}
