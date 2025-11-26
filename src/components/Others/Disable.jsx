import React, { useEffect, useState } from "react";

const MaintenanceWrapper = ({ children }) => {
    const isDown = true; // keep this true to show warning

    const message = "⚠ WARNING: This is a scam website.";


    if (isDown) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-red-700 text-white font-mono">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
                    {message || "⚠ WARNING"}
                </h1>

                <p className="text-xl md:text-base text-center opacity-90">
                    This site is full of scammers. Do not invest.
                </p>

                <p className="mt-2 text-xl opacity-70">
                    For your safety, please leave this website.
                </p>
            </div>
        );
    }

    return children;
};

export default MaintenanceWrapper;
