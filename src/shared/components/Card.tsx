import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="rounded-xl border bg-white shadow-sm p-4 md:p-6">
            {children}
        </div>
    );
};
