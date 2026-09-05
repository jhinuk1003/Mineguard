import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DashboardSection = (): JSX.Element => {
  return (
    <section id="dashboard" className="relative flex flex-col items-center gap-12 py-20 px-6 md:px-16 lg:px-28 w-full bg-[#120726] overflow-hidden">
      <div className="absolute inset-0 jali-pattern opacity-15 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-3 max-w-3xl text-center">
        <div className="truck-art-badge text-xs">
          <span>⚡ राज दरबार • ROYAL OPERATIONAL DURBAR</span>
        </div>

        <h2 className="font-['Rozha_One',serif] text-4xl sm:text-5xl text-[#FFF8E7] tracking-wide mt-2">
          Modular Bento <span className="desi-text-fire">Operations Grid</span>
        </h2>
        <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-[#FFF8E7]/75 max-w-xl">
          A high-visibility modular interface designed for swift decision-making, live sensor feeds, and shift coordination under extreme mining conditions.
        </p>
      </div>

      {/* Ornate Royal Frame */}
      <div className="relative z-10 w-full max-w-6xl p-1.5 sm:p-2.5 rounded-3xl bg-gradient-to-r from-[#F5D061] via-[#E11D74] to-[#FF7A00] shadow-2xl shadow-black/80">
        <div className="rounded-[22px] overflow-hidden border-2 border-[#F5D061]/80 bg-[#1A0B36] p-2 sm:p-3 relative">
          {/* Ornate Corner Badges */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#120726]/90 border border-[#F5D061] text-[#F5D061] text-[11px] font-bold font-['Rajdhani',sans-serif] tracking-widest uppercase shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>LIVE 24/7 • सक्रिय टेलीमेट्री</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#F5D061]/30 relative group">
            <img
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
              alt="Dashboard interface showing mining operations data in a bento-style layout"
              src="/dashboard--worker-1.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120726]/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
