import React from "react";
import { Atom } from "react-loading-indicators";

export default function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Container for the Atom loader */}
      <div className="relative flex items-center justify-center p-6 bg-slate-900/50 rounded-full border border-slate-800 shadow-xl">
        <Atom
          color="#6366f1" // indigo-500
          size="medium"
          text=""
          textColor=""
        />

        {/* Decorative Outer Ring pulse */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping"></div>
      </div>

      {/* Subtle text indicator */}
      <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase animate-pulse">
        Authenticating
      </p>
    </div>
  );
}
