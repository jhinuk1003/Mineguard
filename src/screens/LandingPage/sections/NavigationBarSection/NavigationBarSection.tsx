import React from "react";
import { Button } from "../../../../components/ui/button";

interface NavigationBarSectionProps {
  onNavigateToDashboard?: () => void;
  onNavItemClick?: (section: string) => void;
}

export const NavigationBarSection = ({ onNavigateToDashboard, onNavItemClick }: NavigationBarSectionProps): JSX.Element => {
  const navItems = [
    { label: "Features", href: "#features", subLabel: "विशेषताएं" },
    { label: "Dashboard", href: "#dashboard", subLabel: "नियंत्रण कक्ष" },
    { label: "Training", href: "#training", subLabel: "प्रशिक्षण" },
    { label: "Safety", href: "#safety", subLabel: "सुरक्षा" },
  ];

  const handleLoginClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleGetStartedClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleNavItemClick = (e: React.MouseEvent, item: { label: string; href: string }) => {
    e.preventDefault();
    if (onNavItemClick) {
      onNavItemClick(item.label);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 lg:px-16 py-3.5 sticky top-0 z-50 self-stretch w-full bg-[#180A30]/95 backdrop-blur-md border-b-2 border-[#F5D061]/40 shadow-xl shadow-black/40 marigold-border-top">
      {/* Logo and Brand with Royal Desi Seal */}
      <div className="inline-flex items-center gap-3 relative cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="relative w-11 h-11 bg-gradient-to-tr from-[#BE123C] via-[#E11D74] to-[#FF7A00] rounded-xl p-[2px] shadow-md shadow-[#E11D74]/40 flex items-center justify-center border border-[#F5D061]/80">
          <div className="w-full h-full bg-[#1A0B36] rounded-[10px] flex items-center justify-center relative overflow-hidden">
            <img
              className="w-6 h-6 object-contain filter drop-shadow-[0_2px_4px_rgba(245,208,97,0.8)]"
              alt="MineGuard Seal"
              src="/game-icons-mine-truck.svg"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1.5">
            <span className="font-['Rozha_One',serif] font-bold text-xl text-[#FFF8E7] tracking-wider">MINE</span>
            <span className="font-['Rozha_One',serif] font-bold text-xl text-[#FF7A00] tracking-wider">GUARD</span>
            <span className="text-xs text-[#F5D061] font-bold px-1.5 py-0.5 rounded bg-[#FF7A00]/20 border border-[#F5D061]/40 ml-1">
              सुरक्षा
            </span>
          </div>
          <div className="text-[10px] font-['Rajdhani',sans-serif] font-semibold text-[#F5D061]/80 tracking-widest uppercase">
            खान सुरक्षा एवं प्रबंधन • ADVANCED COAL TECH
          </div>
        </div>
      </div>

      {/* Navigation Links with Desi Hover Glow */}
      <div className="hidden md:inline-flex items-center gap-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-200"
            onClick={(e) => handleNavItemClick(e, item)}
          >
            <span className="font-['Poppins',sans-serif] font-semibold text-[#FFF8E7] text-sm group-hover:text-[#F5D061] transition-colors">
              {item.label}
            </span>
            <span className="text-[9px] font-['Rajdhani',sans-serif] text-[#FF7A00]/80 group-hover:text-[#FFA047] -mt-0.5 transition-colors">
              {item.subLabel}
            </span>
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E11D74] group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="inline-flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="px-4 py-1.5 font-['Rajdhani',sans-serif] uppercase font-bold text-xs tracking-wider"
          onClick={handleLoginClick}
        >
          प्रवेश • Login
        </Button>

        <Button 
          variant="default"
          size="sm"
          className="px-5 py-1.5 font-['Rajdhani',sans-serif] uppercase font-bold text-xs tracking-wider"
          onClick={handleGetStartedClick}
        >
          आरंभ करें • Get Started
        </Button>
      </div>
    </nav>
  );
};
