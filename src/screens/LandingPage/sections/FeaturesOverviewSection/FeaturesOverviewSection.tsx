import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FeaturesOverviewSection = (): JSX.Element => {
  const features = [
    {
      title: "Bento-Style Dashboard",
      hindiTitle: "नियंत्रण महा-पटल",
      description:
        "Modular, customizable dashboard providing at-a-glance insights into all critical mine operations and safety metrics.",
      icon: "/mage-dashboard-2-fill.svg",
      gemColor: "from-[#10B981]/20 to-[#047857]/40 border-[#10B981]",
      gemIconBg: "bg-[#10B981]/25 border-[#10B981]",
      badge: "पन्ना • Emerald",
    },
    {
      title: "Digital Logbook System",
      hindiTitle: "डिजिटल दैनिक बहीखाता",
      description:
        "Centralized logging system for shift reports, maintenance records, and safety incidents with OCR for instant paper log conversion.",
      icon: "/basil-book-solid.svg",
      gemColor: "from-[#00A896]/20 to-[#026E62]/40 border-[#00A896]",
      gemIconBg: "bg-[#00A896]/25 border-[#00A896]",
      badge: "नीलम • Sapphire",
    },
    {
      title: "Real-Time Alerts",
      hindiTitle: "तात्कालिक सतर्कता घंटी",
      description:
        "Immediate high-priority notifications for gas leaks, equipment vibration anomalies, and environmental threshold alerts.",
      icon: "/mdi-bell.svg",
      gemColor: "from-[#BE123C]/20 to-[#881337]/40 border-[#BE123C]",
      gemIconBg: "bg-[#BE123C]/25 border-[#BE123C]",
      badge: "माणिक • Ruby",
    },
    {
      title: "Attendance Tracking",
      hindiTitle: "श्रमिक उपस्थिति व सुरक्षा",
      description:
        "Automated personnel tracking with biometric and Civic identity verification for worker safety inside shafts.",
      icon: "/material-symbols-person-check-rounded.svg",
      gemColor: "from-[#FFB800]/20 to-[#B8860B]/40 border-[#FFB800]",
      gemIconBg: "bg-[#FFB800]/25 border-[#FFB800]",
      badge: "पुखराज • Topaz",
    },
    {
      title: "Production Analytics",
      hindiTitle: "उत्पादन सांख्यिकी विश्लेषण",
      description:
        "Deep data visualization and predictive AI analytics to optimize daily coal extraction rates and fuel consumption.",
      icon: "/tabler-chart-pie-filled.svg",
      gemColor: "from-[#E11D74]/20 to-[#9E0E4E]/40 border-[#E11D74]",
      gemIconBg: "bg-[#E11D74]/25 border-[#E11D74]",
      badge: "रानी गार्नेट • Garnet",
    },
    {
      title: "QR Batch Tracking",
      hindiTitle: "क्यूआर लॉजिस्टिक ट्रैकिंग",
      description:
        "Tamper-proof QR code generation and cryptographic audit trails for coal shipments from pithead to power plants.",
      icon: "/mingcute-link-fill.svg",
      gemColor: "from-[#FF7A00]/20 to-[#C75800]/40 border-[#FF7A00]",
      gemIconBg: "bg-[#FF7A00]/25 border-[#FF7A00]",
      badge: "स्वर्ण • Gold Seal",
    },
  ];

  return (
    <section id="features" className="relative flex flex-col items-center gap-14 py-20 px-6 lg:px-20 w-full bg-[#15092A] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 jali-pattern opacity-15 pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col max-w-3xl items-center text-center gap-3">
        <div className="truck-art-badge text-xs">
          <span>👑 सर्वोत्कृष्ट विशेषताएं • SUPREME CAPABILITIES</span>
        </div>

        <h2 className="font-['Rozha_One',serif] text-4xl sm:text-5xl text-[#FFF8E7] tracking-wide mt-2">
          Comprehensive Mine <span className="desi-text-gold">Intelligence Suite</span>
        </h2>

        <p className="font-['Poppins',sans-serif] text-[#FFF8E7]/75 text-base sm:text-lg max-w-xl">
          Crafted with royal precision and industrial resilience. Six core pillars empowering modern mining conglomerates.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#F5D061]"></div>
          <span className="text-[#F5D061] text-base">✦ 🪔 ✦</span>
          <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#F5D061]"></div>
        </div>
      </div>

      {/* 6 Jewel Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-7xl">
        {features.map((feature, index) => (
          <div
            key={`feature-${index}`}
            className="group relative rounded-2xl p-[1.5px] bg-gradient-to-b from-[#F5D061]/50 via-[#E11D74]/30 to-[#FF7A00]/40 hover:from-[#F5D061] hover:to-[#E11D74] transition-all duration-300 shadow-xl shadow-black/40 hover:-translate-y-2 hover:shadow-[#FF7A00]/20"
          >
            <div className="h-full w-full rounded-[15px] bg-gradient-to-br from-[#220E3E]/95 via-[#1A0A32]/95 to-[#120726]/95 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
              {/* Corner Star Embellishments */}
              <div className="absolute top-2.5 left-3 text-[10px] text-[#F5D061]/50 group-hover:text-[#F5D061] transition-colors">✦</div>
              <div className="absolute top-2.5 right-3 text-[10px] text-[#F5D061]/50 group-hover:text-[#F5D061] transition-colors">✦</div>

              <div className="flex flex-col gap-4">
                {/* Top Row: Icon and Hindi Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-md p-2.5 ${feature.gemIconBg} group-hover:scale-110 transition-transform`}>
                    <img
                      className="w-full h-full object-contain filter brightness-125"
                      alt={feature.title}
                      src={feature.icon}
                    />
                  </div>

                  <span className="text-[11px] font-bold font-['Rajdhani',sans-serif] px-2.5 py-0.5 rounded-full bg-[#120726] border border-[#F5D061]/40 text-[#F5D061] tracking-wider uppercase">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00] tracking-wider">
                    {feature.hindiTitle}
                  </div>
                  <h3 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] group-hover:text-[#F5D061] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-['Poppins',sans-serif] text-sm text-[#FFF8E7]/70 leading-relaxed mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Indicator */}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#F5D061]/20">
                <span className="font-['Rajdhani',sans-serif] font-bold text-xs uppercase tracking-wider text-[#F5D061] group-hover:text-[#FFA047] transition-colors">
                  विवरण देखें • Explore
                </span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#F5D061] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
