import React from "react";

export const FooterSection = (): JSX.Element => {
  const navLinks = [
    { text: "About Us • हमारे बारे में", href: "#" },
    { text: "DGMS Guidelines • सुरक्षा नियम", href: "#" },
    { text: "Shaft Telemetry • टेलीमेट्री", href: "#" },
    { text: "Helpdesk • सहायता केंद्र", href: "#" },
  ];

  return (
    <footer className="relative flex flex-col items-center px-6 lg:px-20 py-16 w-full bg-[#120726] border-t border-[#F5D061]/30">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-[#F5D061]/20">
        {/* Brand Column */}
        <div className="flex flex-col items-start gap-4 max-w-md">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#BE123C] to-[#FF7A00] rounded-xl p-[2px] shadow-md border border-[#F5D061]">
              <div className="w-full h-full bg-[#1A0B36] rounded-[9px] flex items-center justify-center">
                <img
                  className="w-5 h-5 object-contain"
                  alt="MineGuard"
                  src="/game-icons-mine-truck.svg"
                />
              </div>
            </div>
            <div>
              <div className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] tracking-wider">
                MINE<span className="text-[#FF7A00]">GUARD</span>
              </div>
              <div className="text-[9px] font-['Rajdhani',sans-serif] font-bold text-[#F5D061] tracking-widest uppercase">
                खान सुरक्षा एवं प्रबंधन संस्थान
              </div>
            </div>
          </div>

          <p className="font-['Poppins',sans-serif] text-sm text-[#FFF8E7]/70 leading-relaxed">
            Leading the modern mining revolution across the Indian subcontinent with decentralized Web3 batch verification, real-time hazardous gas telemetrics, and AI gear surveillance.
          </p>

          <div className="flex items-center gap-2 text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00] uppercase tracking-wider">
            <span>🪔 सर्वजन हिताय • सर्वजन सुखाय</span>
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col items-start gap-4">
          <div className="font-['Rozha_One',serif] text-lg text-[#F5D061] tracking-wide">
            त्वरित संपर्क • Quick Links
          </div>
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm font-['Poppins',sans-serif] text-[#FFF8E7]/70 hover:text-[#FF7A00] transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        {/* Mining Hubs Column */}
        <div className="flex flex-col items-start gap-4">
          <div className="font-['Rozha_One',serif] text-lg text-[#F5D061] tracking-wide">
            प्रमुख केंद्र • Operational Hubs
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#FFF8E7]/70 font-['Poppins',sans-serif]">
            <div>• <strong className="text-white">Dhanbad Hub:</strong> Jharia Coalfield Operations, Jharkhand</div>
            <div>• <strong className="text-white">Ranchi HQ:</strong> Safety Surveillance Tower, Sector-4</div>
            <div>• <strong className="text-white">Kolkata Office:</strong> Eastern Coal Logistics Center</div>
            <div className="text-xs text-[#F5D061] pt-1">Toll-Free Emergency: 1800-MINE-GUARD</div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full max-w-7xl pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FFF8E7]/50 font-['Rajdhani',sans-serif] tracking-wider gap-3">
        <div>© 2026 MINEGUARD TECHNOLOGIES. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-4 text-[#F5D061]/80">
          <span>भारत में निर्मित • PROUDLY ENGINEERED IN INDIA</span>
          <span>✦</span>
          <span>DGMS CERTIFIED</span>
        </div>
      </div>
    </footer>
  );
};
