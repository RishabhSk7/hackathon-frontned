// src/components/Topbar.tsx
import React from "react";

export default function Topbar() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-6 glass-card">
    <div className="flex items-center gap-3">
      <div className="text-xl font-semibold text-slate-800 font-serif">Chat</div>
    </div>

      <div className="flex items-center gap-4">
        {/* Persona Selector Styled */}
        <div className="flex items-center space-x-1 bg-slate-200/70 p-1 rounded-full">
            <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-white shadow-sm text-sky-600">Adventurer AI</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-full text-slate-500 hover:bg-white/50">Relaxation AI</button>
        </div>
      </div>
    </header>
  );
}