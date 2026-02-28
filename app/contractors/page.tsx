/* --- FILE: app/contractors/page.tsx --- */
import ContractorList from "@/components/contractors/ContractorList";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0; // Ensure fresh data on every visit

export default async function ContractorsPage() {
  // Fetch all contractors from Supabase
  const { data: initialContractors, error } = await supabase
    .from("contractors")
    .select("*")
    .order("rating", { ascending: false });

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
        <ContractorList initialContractors={initialContractors || []} />
      </div>
    </main>
  );
}
