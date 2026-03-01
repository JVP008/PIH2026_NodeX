import React from 'react';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <div className="w-16 h-16 bg-blue-300 border-3 border-black rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
                    <i className="fas fa-briefcase text-2xl text-black"></i>
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tight mb-8 text-black">Careers</h1>

                <div className="space-y-6 text-xl font-medium text-black leading-relaxed">
                    <p>
                        We are a small team with a massive goal to organize the home services market across India. Up until now, finding reliable help has been totally broken. We are fixing that, block by block.
                    </p>
                    <p>
                        Right now, we are looking for passionate builders. You do not need a fancy degree to join us. You just need to care deeply about the user experience and be willing to solve tough problems.
                    </p>

                    <div className="bg-yellow-100 p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] mt-8">
                        <h3 className="font-black uppercase text-2xl mb-4">Open Roles</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b-2 border-black pb-4">
                                <div>
                                    <div className="font-black">Frontend Engineer</div>
                                    <div className="text-gray-600 text-sm">Remote, India</div>
                                </div>
                                <button className="bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-800 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-1">Apply</button>
                            </li>
                            <li className="flex justify-between items-center">
                                <div>
                                    <div className="font-black">Community Manager</div>
                                    <div className="text-gray-600 text-sm">Mumbai, Hub</div>
                                </div>
                                <button className="bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-800 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-1">Apply</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
