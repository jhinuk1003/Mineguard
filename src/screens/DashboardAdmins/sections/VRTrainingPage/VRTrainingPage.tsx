
import { Glasses, Users, Award, TrendingUp, Play, CheckCircle, Clock, ShieldAlert, Sparkles, Cpu } from "lucide-react";

export const VRTrainingPage = (): JSX.Element => {
  const trainingModules = [
    {
      id: 1,
      title: "सुरक्षा नियमावली प्रशिक्षण • Mine Safety Protocol",
      description: "Learn essential DGMS life-saving procedures for underground shafts",
      duration: "45 min",
      difficulty: "प्रारंभिक • Beginner",
      status: "available",
      statusLabel: "उपलब्ध • Available",
      participants: 23,
      completion: "85%",
      color: "from-emerald-900/40 to-[#180A30]"
    },
    {
      id: 2,
      title: "भारी उपकरण संचालन • Heavy Machinery Mastery",
      description: "Master heavy hydraulic excavators and dump trucks in virtual quarries",
      duration: "90 min",
      difficulty: "मध्यम • Intermediate",
      status: "in-progress",
      statusLabel: "प्रगति पर • In-Progress",
      participants: 18,
      completion: "60%",
      color: "from-amber-900/40 to-[#180A30]"
    },
    {
      id: 3,
      title: "आपदा प्रतिक्रिया एवं बचाव • Emergency Evacuation",
      description: "Simulate rapid methane blowout and strata collapse response scenarios",
      duration: "60 min",
      difficulty: "उन्नत • Advanced",
      status: "completed",
      statusLabel: "सत्यापित • Completed",
      participants: 15,
      completion: "100%",
      color: "from-purple-900/40 to-[#180A30]"
    },
    {
      id: 4,
      title: "खतरा पहचान एवं निवारण • Hazard Recognition AI",
      description: "AI-guided recognition of crack propagation and toxic gas pockets",
      duration: "30 min",
      difficulty: "प्रारंभिक • Beginner",
      status: "available",
      statusLabel: "उपलब्ध • Available",
      participants: 12,
      completion: "0%",
      color: "from-rose-900/40 to-[#180A30]"
    }
  ];

  const activeSessions = [
    {
      id: 1,
      user: "राजेश कुमार (Rajesh Kumar)",
      module: "Heavy Machinery Mastery (Excavator E-5678)",
      startTime: "14:30 IST",
      duration: "45 min",
      progress: "60%"
    },
    {
      id: 2,
      user: "मनोज सोरेन (Manoj Soren)",
      module: "Mine Safety Protocol & Gas Ingress",
      startTime: "14:15 IST",
      duration: "30 min",
      progress: "75%"
    }
  ];

  const trainingStats = [
    { title: "कुल सत्र • Total Sessions", value: "156", sub: "Complete Immersions", icon: Glasses, color: "text-[#F5D061]", border: "border-[#F5D061]/50" },
    { title: "सक्रिय खनिक • Active Miners", value: "8", sub: "Currently in Simulation", icon: Users, color: "text-[#00A896]", border: "border-[#00A896]/50" },
    { title: "सफलता दर • Pass Rate", value: "87%", sub: "DGMS Certification", icon: Award, color: "text-[#E11D74]", border: "border-[#E11D74]/50" },
    { title: "औसत अंक • Average Score", value: "92.5", sub: "Safety Index / 100", icon: TrendingUp, color: "text-[#FF7A00]", border: "border-[#FF7A00]/50" }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-[#120726] via-[#1A0A30] to-[#120726] text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1F0838]/95 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-[0_8px_32px_rgba(225,29,116,0.25)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase mb-2">
                <span>✦ आभासी प्रशिक्षण केंद्र ✦</span>
                <span>Immersive 3D Mine Simulators</span>
              </div>
              <h1 className="font-['Rozha_One',serif] text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00] flex items-center gap-3">
                <Glasses className="w-8 h-8 text-[#FF7A00]" />
                वीआर प्रशिक्षण केंद्र • VR Simulation Hub
              </h1>
              <p className="text-[#FFF8E7]/70 font-['Rajdhani',sans-serif] text-sm md:text-base mt-1">
                Zero-Hazard Underground VR Training, Disaster Scenarios & Heavy Machinery Simulators
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#2D1254] px-4 py-2 rounded-xl border border-[#F5D061]/40">
              <Sparkles className="w-5 h-5 text-[#F5D061]" />
              <span className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7]">
                सिम्युलेटर स्थिति • All VR Rigs Online
              </span>
            </div>
          </div>
        </div>

        {/* Training Stats (Navratna Gem Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainingStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className={`p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 ${stat.border} shadow-lg backdrop-blur-md relative overflow-hidden`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">{stat.title}</p>
                    <p className={`text-3xl font-['Rozha_One',serif] ${stat.color} mt-1`}>{stat.value}</p>
                    <p className="text-xs text-[#FFF8E7]/50 font-['Rajdhani',sans-serif] mt-0.5">{stat.sub}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#180A30] border border-[#F5D061]/30 flex items-center justify-center shadow-inner">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Sessions & Training Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Sessions */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl backdrop-blur-md">
            <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-4 flex items-center gap-2 border-b border-[#F5D061]/20 pb-3">
              <Clock className="w-5 h-5 text-[#FF7A00]" />
              सक्रिय प्रशिक्षण सत्र • Live Training Sessions
            </h2>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-xl bg-[#180A30]/90 border border-[#F5D061]/25 hover:border-[#FF7A00]/50 transition-all shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-['Rajdhani',sans-serif] font-bold text-base text-[#FFF8E7]">{session.user}</h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold font-['Rajdhani',sans-serif] bg-emerald-950/70 border border-emerald-500 text-emerald-300">
                      ● सक्रिय Live
                    </span>
                  </div>
                  <p className="text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold mb-2">{session.module}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-[#FFF8E7]/70 mb-3">
                    <span>प्रारंभ Start: {session.startTime}</span>
                    <span>अवधि Duration: {session.duration}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-['Rajdhani',sans-serif] font-bold mb-1">
                      <span className="text-[#FFF8E7]/70">प्रगति • Progress</span>
                      <span className="text-[#FF7A00]">{session.progress}</span>
                    </div>
                    <div className="w-full bg-[#120726] rounded-full h-2.5 border border-[#F5D061]/20 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#FF7A00] to-[#E11D74] h-2.5 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                        style={{ width: session.progress }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Modules */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl backdrop-blur-md">
            <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-4 flex items-center gap-2 border-b border-[#F5D061]/20 pb-3">
              <Award className="w-5 h-5 text-[#00A896]" />
              उपलब्ध मॉड्यूल • Available Simulators
            </h2>
            <div className="space-y-4">
              {trainingModules.map((module) => (
                <div key={module.id} className="p-4 rounded-xl bg-[#180A30]/90 border border-[#F5D061]/25 hover:border-[#F5D061]/60 transition-all shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 pr-2">
                      <h3 className="font-['Rajdhani',sans-serif] font-bold text-base text-[#FFF8E7]">{module.title}</h3>
                      <p className="text-[#FFF8E7]/70 text-xs mt-0.5">{module.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-['Rajdhani',sans-serif]">
                        <span className="text-[#F5D061] font-bold">⏱ {module.duration}</span>
                        <span className="px-2 py-0.5 rounded bg-[#E11D74]/20 border border-[#E11D74]/40 text-[#FFF8E7] font-bold">
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-['Rajdhani',sans-serif] bg-[#00A896]/20 border border-[#00A896] text-[#00A896]">
                      {module.statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5D061]/15">
                    <div className="text-xs font-['Rajdhani',sans-serif] text-[#FFF8E7]/60">
                      👥 {module.participants} खनिक भाग ले चुके • {module.completion} सफलता
                    </div>
                    <button className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      सत्र शुरू करें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VR Equipment Status */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl">
          <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-5 flex items-center gap-2 border-b border-[#F5D061]/20 pb-3">
            <Cpu className="w-5 h-5 text-[#F5D061]" />
            हार्डवेयर एवं उपकरण स्थिति • VR Rig Telemetry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-[#180A30]/80 border border-[#00A896]/40">
              <div className="w-14 h-14 bg-[#00A896]/20 border border-[#00A896] rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px_rgba(0,168,150,0.3)]">
                <Glasses className="w-7 h-7 text-[#00A896]" />
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-base text-white">वीआर हेडसेट • VR Helmets</h3>
              <p className="text-emerald-400 font-['Rajdhani',sans-serif] font-bold text-sm mt-1">8/10 तत्पर (Operational)</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#180A30]/80 border border-[#F5D061]/40">
              <div className="w-14 h-14 bg-[#F5D061]/20 border border-[#F5D061] rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px_rgba(245,208,97,0.3)]">
                <Sparkles className="w-7 h-7 text-[#F5D061]" />
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-base text-white">मोशन कंट्रोलर्स • Haptic Gloves</h3>
              <p className="text-[#F5D061] font-['Rajdhani',sans-serif] font-bold text-sm mt-1">सभी चालू (100% Calibrated)</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#180A30]/80 border border-[#FF7A00]/40">
              <div className="w-14 h-14 bg-[#FF7A00]/20 border border-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px_rgba(255,122,0,0.3)]">
                <ShieldAlert className="w-7 h-7 text-[#FF7A00]" />
              </div>
              <h3 className="font-['Rajdhani',sans-serif] font-bold text-base text-white">नियमित रखरखाव • Maintenance</h3>
              <p className="text-amber-400 font-['Rajdhani',sans-serif] font-bold text-sm mt-1">2 यूनिट जांच हेतु (Scheduled)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 