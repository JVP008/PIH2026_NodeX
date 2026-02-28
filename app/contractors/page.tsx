import ContractorList from '@/components/contractors/ContractorList';

// No Supabase call here — ContractorList uses built-in dummy data when DB is empty.
// When real DB is ready, uncomment the Supabase fetch below and pass the result.
export const revalidate = 3600; // Cache for 1 hour when DB is connected

export default async function ContractorsPage() {
    // const { data: contractors } = await supabase.from('contractors').select('*');
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ContractorList initialContractors={[]} />
        </div>
    );
}
