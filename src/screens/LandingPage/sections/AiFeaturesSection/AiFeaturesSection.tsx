import { Badge } from "../../../../components/ui/badge";
import { Card } from "../../../../components/ui/card";

export const AiFeaturesSection = (): JSX.Element => {
  const features = [
    {
      icon: "/mingcute-cardboard-vr-fill.svg",
      title: "VR Training Simulations",
      hindiTitle: "आभासी सुरक्षा प्रशिक्षण",
      description:
        "Immersive virtual reality training simulations for emergency mine shaft evacuation and high-risk drill operations.",
    },
    {
      icon: "/garden-security-26.svg",
      title: "GenAI PPE Verification",
      hindiTitle: "कृत्रिम बुद्धिमत्ता सुरक्षा कवच",
      description:
        "Gemini-powered vision analysis instantly confirms helmets, respirators, high-vis vests, and boots before shaft entry.",
    },
    {
      icon: "/fluent-bot-sparkle-32-filled.svg",
      title: "RAG Safety Knowledge Chatbot",
      hindiTitle: "२४/७ विशेषज्ञ सुरक्षा सहायक",
      description:
        "Instant conversational access to all DGMS safety regulations, equipment manuals, and historic hazard protocols.",
    },
  ];

  return (
    <section id="training" className="relative flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 w-full bg-[#180A30] overflow-hidden gap-12">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A896]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E11D74]/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Left Column */}
      <div className="relative z-10 flex flex-col w-full lg:w-[560px] items-start gap-6">
        <div className="truck-art-badge text-xs">
          <span>🦚 मोरपंख सुरक्षा • AI POWERED KAVACH</span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-['Rozha_One',serif] text-3xl sm:text-4xl lg:text-5xl text-[#FFF8E7] leading-tight tracking-wide">
            Intelligent Safety & <br />
            <span className="desi-text-peacock">Automated Training</span>
          </h2>

          <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-[#FFF8E7]/80 leading-relaxed">
            Our multi-modal vision models and immersive VR training keep every worker safeguarded against hazards before they set foot into deep excavation shafts.
          </p>
        </div>

        {/* 3 Features List */}
        <div className="flex flex-col gap-5 w-full mt-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#260E45]/80 border border-[#F5D061]/30 hover:border-[#00A896] hover:bg-[#00A896]/10 transition-all duration-300 shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A896] to-[#01685D] border border-[#F5D061]/50 p-2.5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00A896]/30">
                <img
                  className="w-full h-full object-contain filter brightness-125"
                  alt={feature.title}
                  src={feature.icon}
                />
              </div>

              <div className="flex flex-col">
                <div className="text-[11px] font-['Rajdhani',sans-serif] font-bold text-[#F5D061] tracking-wider uppercase">
                  {feature.hindiTitle}
                </div>
                <h3 className="font-['Rozha_One',serif] text-lg text-[#FFF8E7]">
                  {feature.title}
                </h3>
                <p className="font-['Poppins',sans-serif] text-sm text-[#FFF8E7]/70 leading-normal mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Ornate Photo Frame */}
      <div className="relative z-10 w-full lg:w-[500px] flex items-center justify-center">
        <div className="relative p-2 rounded-3xl bg-gradient-to-tr from-[#00A896] via-[#F5D061] to-[#E11D74] shadow-2xl shadow-black/80">
          <div className="rounded-[22px] overflow-hidden border-2 border-[#F5D061]/60 bg-[#120726] relative">
            <img
              className="h-[460px] w-full object-cover"
              alt="Worker with safety equipment"
              src="/image-6.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120726] via-transparent to-transparent opacity-80"></div>
            
            {/* Overlay Emblem */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#1A0B36]/90 backdrop-blur-md border border-[#F5D061]/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-emerald-400 font-bold text-lg">
                ✓
              </div>
              <div>
                <div className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">
                  सुरक्षा जांच उत्तीर्ण • 100% COMPLIANT
                </div>
                <div className="text-sm font-semibold text-white">Full Safety Gear Verified by Gemini AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
