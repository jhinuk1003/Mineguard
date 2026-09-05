import { Button } from "../../../../components/ui/button";

interface CallToActionSectionProps {
  onNavigateToDashboard?: () => void;
}

export const CallToActionSection = ({ onNavigateToDashboard }: CallToActionSectionProps): JSX.Element => {
  const stats = [
    {
      icon: "/material-symbols-exclamation-rounded.svg",
      iconBg: "bg-[#10B981]/25",
      iconBorder: "border-[#10B981]",
      percentage: "+35%",
      description: "सुरक्षा सुधार • Improved Safety",
      gem: "माणिक",
    },
    {
      icon: "/mdi-graph-box.svg",
      iconBg: "bg-[#00A896]/25",
      iconBorder: "border-[#00A896]",
      percentage: "+28%",
      description: "उत्पादन वृद्धि • High Efficiency",
      gem: "पन्ना",
    },
    {
      icon: "/mdi-dollar.svg",
      iconBg: "bg-[#FF7A00]/25",
      iconBorder: "border-[#FF7A00]",
      percentage: "-22%",
      description: "लागत में बचत • Cost Reduction",
      gem: "पुखराज",
    },
  ];

  const handleGetStartedClick = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-28 px-6 w-full bg-[#180A30] overflow-hidden marigold-border-top marigold-border-bottom">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#E11D74]/20 via-[#FF7A00]/25 to-[#F5D061]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-4xl mx-auto text-center">
        {/* Truck Art Tag */}
        <div className="truck-art-badge text-xs">
          <span>🪔 शुभ संकल्प • TRANSFORM YOUR ENTERPRISE</span>
        </div>

        <h2 className="font-['Rozha_One',serif] text-4xl sm:text-5xl lg:text-6xl text-[#FFF8E7] leading-tight tracking-wide">
          Ready to Elevate Your <br />
          <span className="desi-text-gold">Mining Enterprise?</span>
        </h2>

        <p className="font-['Poppins',sans-serif] text-[#FFF8E7]/80 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Join leading mining corporations that have escalated safety protocols, achieved 100% regulatory compliance, and drastically lowered operational downtimes with <span className="font-['Rozha_One',serif] text-[#F5D061]">MineGuard</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button 
            size="lg"
            className="px-10 py-4 desi-btn-primary rounded-xl text-base shadow-xl shadow-[#FF7A00]/40"
            onClick={handleGetStartedClick}
          >
            शुभ आरंभ करें • Get Started Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 desi-btn-outline rounded-xl text-base font-semibold"
            onClick={handleGetStartedClick}
          >
            संपर्क करें • Schedule Demo
          </Button>
        </div>

        {/* Ornate Stats Medallions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl pt-8 border-t border-[#F5D061]/25 mt-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 rounded-2xl bg-[#260E45]/80 border border-[#F5D061]/40 shadow-lg shadow-black/30 backdrop-blur-md relative group hover:-translate-y-1 transition-transform"
            >
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center border-2 ${stat.iconBorder} mb-2 shadow-md`}>
                <img
                  className="w-6 h-6 filter brightness-125"
                  alt="Stat icon"
                  src={stat.icon}
                />
              </div>

              <div className="font-['Rozha_One',serif] text-3xl text-[#F5D061] tracking-wide">
                {stat.percentage}
              </div>

              <div className="font-['Rajdhani',sans-serif] font-bold text-xs text-[#FFF8E7]/80 uppercase tracking-wider mt-1 text-center">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
