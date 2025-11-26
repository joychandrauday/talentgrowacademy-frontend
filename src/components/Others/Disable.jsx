import React from "react";

const MaintenanceWrapper = ({ children }) => {
    const isScam = true; // Keep true to show warning

    if (!isScam) return children;

    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black">
            {/* Pulsing red border */}
            <div className="absolute inset-0 border-8 border-red-600 animate-ping"></div>

            {/* Main warning card */}
            <div className="relative bg-white rounded-lg shadow-2xl p-10 max-w-md mx-4 text-center border-4 border-red-600">
                {/* Flashing siren */}
                <div className="text-6xl mb-4 animate-pulse">WARNING SIREN</div>

                <h1 className="text-4xl font-black text-red-600 uppercase tracking-wider">
                    SCAM WEBSITE
                </h1>

                <p className="mt-6 text-xl font-bold text-gray-800">
                    This is <span className="text-red-600">NOT</span> the real site.
                </p>

                <p className="mt-4 text-lg text-gray-700 font-medium">
                    Do NOT connect wallet • Do NOT enter seed phrase • Do NOT send money
                </p>

                <div className="mt-8 p-4 bg-red-100 rounded-lg border-2 border-red-600">
                    <p className="text-2xl font-bold text-red-700 animate-pulse">
                        CLOSE THIS TAB NOW
                    </p>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    You are being protected from a known phishing/scam site.
                </p>
            </div>
        </div>
    );
};

export default MaintenanceWrapper;
