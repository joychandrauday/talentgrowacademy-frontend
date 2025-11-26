import React, { useEffect, useState } from "react";

const MaintenanceWrapper = ({ children }) => {
    const isDown = true; // Force scam warning mode

    if (!isDown) return children;

    return (
        <div className="fixed inset-0 overflow-hidden bg-black text-red-600 font-black z-[999999]">
            {/* Full-screen pulsing background */}
            <div className="absolute inset-0 bg-red-800 animate-pulse opacity-80"></div>

            {/* Massive centered warning */}
            <div className="relative h-screen w-screen flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-9xl font-extrabold animate-bounce text-yellow-400 drop-shadow-2xl tracking-wider">
                    ⚠️ SCAM ALERT ⚠️
                </h1>
                <h2 className="text-4xl md:text-7xl font-extrabold mt-4 text-white blinking-text drop-shadow-lg">
                    THIS WEBSITE IS A SCAM!
                </h2>
                <p className="text-2xl md:text-5xl mt-6 text-yellow-300 font-bold animate-pulse">
                    DO NOT INVEST • DO NOT MAKE TRANSACTION • DO NOT ENTER PERSONAL DATA
                </p>
                <p className="text-3xl md:text-6xl mt-8 text-red-500 font-extrabold tracking-wide">
                    YOU WILL LOSE ALL YOUR MONEY!
                </p>
                <div className="mt-10 text-4xl md:text-6xl text-white font-bold animate-ping">
                    🚨 LEAVE IMMEDIATELY 🚨
                </div>
            </div>

            {/* Repeating SCAM text grid all over the screen */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-6xl md:text-9xl font-black opacity-70 transform rotate-[-30deg] text-red-600 blinking-text"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `translate(-50%, -50%) rotate(${Math.random() * 60 - 30}deg)`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    >
                        SCAM
                    </div>
                ))}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={`warning-${i}`}
                        className="absolute text-5xl md:text-8xl font-extrabold opacity-80 text-yellow-400 drop-shadow-2xl animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `translate(-50%, -50%) rotate(${Math.random() * 90 - 45}deg)`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    >
                        FAKE SITE!
                    </div>
                ))}
            </div>

            {/* Top banner ticker */}
            <div className="absolute top-0 left-0 w-full bg-red-900 text-yellow-300 text-4xl md:text-6xl font-bold py-4 overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee">
                    ⚠️ SCAM WEBSITE ⚠️ DO NOT TRUST ⚠️ YOU WILL BE ROBBED ⚠️ CLOSE THIS TAB NOW ⚠️&nbsp;
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .blinking-text {
                    animation: blink 1.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default MaintenanceWrapper;
