import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="w-16 h-16 bg-pink-300 border-3 border-black rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
          <i className="fas fa-file-contract text-2xl text-black"></i>
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tight mb-8 text-black">
          Terms of Service
        </h1>

        <div className="space-y-6 text-lg font-medium text-black leading-relaxed">
          <p>
            Welcome to HouseConnect. By using our platform to find professionals or offer your
            services, you agree to play by a few basic rules. We kept this simple so everyone can
            understand it.
          </p>
          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <span className="font-black">Be Honest:</span> Do not post fake jobs or fake
                reviews. If you are a professional, be honest about your skills and pricing.
              </li>
              <li>
                <span className="font-black">Be Respectful:</span> Treat the people you hire and the
                people hiring you with basic human decency. We will block anyone who harasses others
                on our platform.
              </li>
              <li>
                <span className="font-black">Our Role:</span> We provide the connection. We verify
                the professionals to the best of our ability, but you are ultimately entering a
                contract with them directly, not with us.
              </li>
            </ul>
          </div>
          <p>
            If you violate these terms, we reserve the right to suspend or permanently delete your
            account to protect the rest of the community.
          </p>
        </div>
      </div>
    </div>
  );
}
