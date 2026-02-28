import ContractorList from "@/components/contractors/ContractorList";
import { supabase } from "@/lib/supabaseClient";
import { seedContractors } from "@/lib/seedContractors";
import { Contractor } from "@/types";

export const revalidate = 0; // Ensure fresh data on every visit

export default async function ContractorsPage() {
  // Fetch all contractors from Supabase
  const { data: dbContractors, error } = await supabase
    .from("contractors")
    .select("*")
    .order("rating", { ascending: false });

  // Merge database contractors with seed contractors,
  // preferring database records if IDs overlap.
  const allContractors: Contractor[] = [...(dbContractors || [])];

  // Add seed contractors that aren't already in the database list
  seedContractors.forEach((seed) => {
    if (!allContractors.some((db) => db.id === seed.id)) {
      allContractors.push(seed);
    }
  });

  // Sort by rating descending
  allContractors.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <main className="min-h-screen bg-[#fdfbf8] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-4">
            Find Your Pro
          </h1>
          <p className="text-xl font-bold text-gray-700">
            Trusted local experts, verified and ready to work.
          </p>
        </div>

        {/* Interactive Client Component for filtering & searching */}
        <ContractorList initialContractors={allContractors} />
      </div>
    </main>
  );
}
