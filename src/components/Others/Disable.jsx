import React, { useEffect, useState } from "react";

const MaintenanceWrapper = ({ children }) => {
    const isDown = false; // toggle this to false to re-enable site
    const [text, setText] = useState("");

    const message = "⚠ SYSTEM FAILURE: SOMETHING WENT WRONG...";

    useEffect(() => {
        if (isDown) {
            let i = 0;
            const interval = setInterval(() => {
                setText(message.slice(0, i));
                i++;
                if (i > message.length) clearInterval(interval);
            }, 80);
            return () => clearInterval(interval);
        }
    }, [isDown]);

    if (isDown) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono overflow-hidden">
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-wider animate-pulse mb-4">
                        {text || "⚠ INITIALIZING ERROR..."}
                    </h1>

                    <p className="text-sm md:text-lg text-green-500 animate-[blink_1s_step-start_infinite]">
                        Please try again later...
                    </p>
                </div>

                <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                    <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(0,255,0,0.1)_1%,transparent_1%)] bg-[size:5px_5px]" />
                </div>

                <div className="absolute bottom-4 text-xs text-green-600">
                    [ SYSTEM LOG: SITE_UNDER_MAINTENANCE / STATUS_CODE: 503 ]
                </div>

                <style>
                    {`
            @keyframes blink {
              50% { opacity: 0; }
            }
          `}
                </style>
            </div>
        );
    }

    return children;
};

export default MaintenanceWrapper;
