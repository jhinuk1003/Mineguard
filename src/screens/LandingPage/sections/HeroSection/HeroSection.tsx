import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full py-24 lg:py-32 px-6 lg:px-20 overflow-hidden bg-[#120726]">
      {/* Background Mandala & Ambient Radiance */}
      <div className="absolute inset-0 jali-pattern opacity-25 pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E11D74]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF7A00]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00A896]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-14">
        {/* Left Content Column */}
        <div className="flex flex-col items-start gap-8 max-w-xl">
          {/* Festive Badge */}
          <div className="truck-art-badge">
            <span className="text-[#FFB800] text-sm">🪔</span>
            <span>शुभ आरंभ • NEXT-GEN SURAKSHA KAVACH</span>
          </div>

          {/* Majestic Royal Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="font-['Rozha_One',serif] text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-wide">
              <span className="text-[#FFF8E7] block">क्रांतिकारी</span>
              <span className="desi-text-gold block">Mining Security</span>
              <span className="desi-text-fire block">& Operations</span>
            </h1>

            <p className="font-['Poppins',sans-serif] text-[#FFF8E7]/80 text-base sm:text-lg leading-relaxed mt-2">
              Comprehensive coal mine management platform seamlessly integrating <span className="text-[#F5D061] font-semibold">Generative AI</span>, <span className="text-[#05D5BE] font-semibold">Web3 QR Tracking</span>, and <span className="text-[#FF7A00] font-semibold">IoT Telemetry</span> for unprecedented safety and maximized production.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <Button 
              size="lg" 
              className="px-8 py-3.5 desi-btn-primary rounded-xl text-base shadow-lg shadow-[#E11D74]/40"
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>आरंभ करें • Get Started</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3.5 desi-btn-outline rounded-xl text-base font-semibold"
              onClick={() => {
                const el = document.getElementById("dashboard");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>नियंत्रण कक्ष • View System</span>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 pt-4 border-t border-[#F5D061]/20 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <div>
                <div className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#F5D061]">100% VERIFIED</div>
                <div className="text-[11px] text-[#FFF8E7]/60">Civic Web3 Identity</div>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-[#F5D061]/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <div className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FF7A00]">ZERO LATENCY</div>
                <div className="text-[11px] text-[#FFF8E7]/60">Hazard Detection</div>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-[#F5D061]/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💎</span>
              <div>
                <div className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#05D5BE]">GRADE-A</div>
                <div className="text-[11px] text-[#FFF8E7]/60">Supply Chain QR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Ornate Frame */}
        <div className="relative w-full lg:w-[540px] flex items-center justify-center">
          {/* Decorative Backing Frame */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#BE123C] via-[#FF7A00] to-[#F5D061] opacity-70 blur-lg animate-pulse-glow"></div>
          
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#F5D061] shadow-2xl bg-[#1C0A33] p-2">
            {/* Ornate Gold Border Inner Wrapper */}
            <div className="relative rounded-xl overflow-hidden border border-[#F5D061]/50 bg-[#120726]">
              <img
                src="/home.png"
                alt="MineGuard Coal Operation Center"
                className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120726] via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Floating Stat Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#1A0B36]/90 backdrop-blur-md border border-[#F5D061]/60 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E11D74] to-[#FF7A00] flex items-center justify-center text-white text-lg font-bold shadow-md">
                    ⛏️
                  </div>
                  <div>
                    <div className="font-['Rozha_One',serif] text-sm text-[#F5D061]">कोल माइन कंट्रोल हब</div>
                    <div className="text-[11px] text-[#FFF8E7]/80 font-['Rajdhani',sans-serif]">Live Telemetry Active • All Shafts Safe</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold font-['Rajdhani',sans-serif] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  SURAKSHA 100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
