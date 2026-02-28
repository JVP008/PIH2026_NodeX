import React from "react";
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="w-16 h-16 bg-orange-300 border-3 border-black rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
          <i className="fas fa-shield-alt text-2xl text-black"></i>
        </div>

        <h1 className="text-5xl font-black uppercase tracking-tight mb-8 text-black">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-lg font-medium text-black leading-relaxed">
          <p>
            We value your trust above everything else. When you share your data
            with us, we treat it with massive respect. This page explains
            exactly what we collect and why we need it.
          </p>

          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black uppercase text-xl mb-2">
              What we collect
            </h3>
            <p className="mb-4">
              We only ask for details that help us connect you with contractors.
              This means your name, phone number, and coarse location data so we
              can find professionals near your house.
            </p>
            <h3 className="font-black uppercase text-xl mb-2">
              Who we share it with
            </h3>
            <p>
              We never sell your data to random ad companies. We only share the
              necessary job details with the verified professional you choose to
              hire.
            </p>
          </div>

          <p>
            If you want us to delete your account and all associated data, just
            drop us an email at support@houseconnect.in and we will wipe it
            within 24 hours. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
