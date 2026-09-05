import { useUser } from "@civic/auth/react";
import { Shield, User } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

// Use a more flexible User type consistent with App.tsx
type User = {
  name?: string;
  avatar?: string;
  email?: string;
  id?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

interface DashboardPageProps {
  user: User;
}

export const DashboardPage = ({ user }: DashboardPageProps): JSX.Element => {
  const { user: civicUser } = useUser();
  
  const statCards = [
    { title: "Current Shift", value: "Morning", subValue: "6:00 - 14:00", icon: "tabler_clock-filled", status: "info" },
    { title: "Mine Temperature", value: "25.5°C", subValue: "Normal", icon: "raphael_temp", status: "normal" },
    { title: "Air Quality", value: "86%", subValue: "Risk", icon: "ic_outline-air", status: "risk" },
    { title: "Methane Level", value: "1.2%", subValue: "Cautions", icon: "game-icons_poison-gas", status: "caution" }
  ];

  const alerts = [
    { title: "High Methane Levels Detected", description: "Section B-7 reported methane levels exceeding safety threshold. Ventilation increased.", time: "10 min ago", type: "high" },
    { title: "Equipment Maintenance Due", description: "Your drill equipment is due for maintenance check. Please report to maintenance bay.", time: "50 min ago", type: "warning" },
    { title: "Schedule Change Notice", description: "Your shift next week has been changed from morning to evening. Please check schedule.", time: "1 hour ago", type: "info" }
  ];

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "सुप्रभात • Good Morning";
    if (hours < 18) return "शुभ मध्याह्न • Good Afternoon";
    return "शुभ संध्या • Good Evening";
  };

  const displayName = user?.given_name || user?.name || "Officer";

  return (
    <div className="flex-1 p-5 lg:p-8 bg-transparent text-[#FFF8E7] font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with User Info & Auspicious Blessing */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1E0C38]/90 to-[#140826]/90 border-2 border-[#F5D061]/40 shadow-xl shadow-black/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪔</span>
              <h1 className="font-['Rozha_One',serif] text-2xl sm:text-3xl text-[#FFF8E7] tracking-wide">
                {getGreeting()}, <span className="desi-text-gold">{displayName}</span>!
              </h1>
            </div>
            <p className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00] uppercase tracking-widest mt-1">
              आज का परिचालन अवलोकन • DAILY OPERATIONAL INTELLIGENCE
            </p>
            
            {/* Civic User Verification Pill */}
            {civicUser && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">
                  Civic Blockchain Verified: {civicUser.email || displayName}
                </span>
              </div>
            )}
          </div>
          
          <div className="relative z-10 flex items-center gap-3">
            <Button variant="outline" className="px-4 py-2 font-['Rajdhani',sans-serif] font-bold uppercase text-xs tracking-wider border-[#F5D061]/50 text-[#F5D061] hover:bg-[#F5D061]/20">
              आज • Today
              <img src="/maki-arrow.svg" alt="arrow" className="ml-2 w-3 h-3 filter invert" />
            </Button>
          </div>
        </div>

        {/* 4 Telemetry Gem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((stat, index) => {
            const config = {
              info: {
                border: 'border-[#00A896]/60',
                glow: 'shadow-[#00A896]/20',
                bg: 'bg-gradient-to-br from-[#00A896]/20 to-[#022A26]/80',
                iconBg: 'bg-[#00A896]/30',
                tag: 'नीलम • Sapphire',
                tagColor: 'text-[#05D5BE]',
              },
              normal: {
                border: 'border-[#10B981]/60',
                glow: 'shadow-[#10B981]/20',
                bg: 'bg-gradient-to-br from-[#10B981]/20 to-[#052E16]/80',
                iconBg: 'bg-[#10B981]/30',
                tag: 'पन्ना • Emerald',
                tagColor: 'text-[#34D399]',
              },
              risk: {
                border: 'border-[#FF7A00]/60',
                glow: 'shadow-[#FF7A00]/25',
                bg: 'bg-gradient-to-br from-[#FF7A00]/20 to-[#3B1500]/80',
                iconBg: 'bg-[#FF7A00]/30',
                tag: 'पुखराज • Topaz',
                tagColor: 'text-[#FFA047]',
              },
              caution: {
                border: 'border-[#BE123C]/60',
                glow: 'shadow-[#BE123C]/30',
                bg: 'bg-gradient-to-br from-[#BE123C]/20 to-[#3B0716]/80',
                iconBg: 'bg-[#BE123C]/30',
                tag: 'माणिक • Ruby Alert',
                tagColor: 'text-[#FDA4AF]',
              },
            }[stat.status] || {
              border: 'border-[#F5D061]/50',
              glow: 'shadow-[#F5D061]/20',
              bg: 'bg-[#260E45]/90',
              iconBg: 'bg-[#F5D061]/20',
              tag: 'स्वर्ण • Gold',
              tagColor: 'text-[#F5D061]',
            };

            return (
              <div 
                key={index} 
                className={`p-5 rounded-2xl ${config.bg} border-2 ${config.border} shadow-lg ${config.glow} hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden backdrop-blur-md`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider ${config.tagColor}`}>
                    {config.tag}
                  </span>
                  <div className={`w-9 h-9 ${config.iconBg} rounded-xl border border-[#F5D061]/40 flex items-center justify-center`}>
                    <img src={`/${stat.icon}.svg`} alt={stat.title} className="w-5 h-5 filter brightness-125" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#FFF8E7]/70">{stat.title}</p>
                  <p className="font-['Rozha_One',serif] text-2xl text-[#FFF8E7] my-1">{stat.value}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <p className={`text-xs font-bold font-['Rajdhani',sans-serif] uppercase tracking-wider ${config.tagColor}`}>{stat.subValue}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Grid: Roster & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workers Present Roster */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/95 via-[#1E0C38]/95 to-[#120726]/95 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#F5D061]/25">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👷</span>
                  <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                    श्रमिक उपस्थिति • Workers Present Today
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FF7A00]/20 border border-[#F5D061]/50 text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">
                  सक्रिय कर्मी: 5
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: "John Doe", id: "W001", role: "Chief Excavator Operator", status: "उपस्थित • Present" },
                  { name: "Jane Smith", id: "W002", role: "Gas Safety Specialist", status: "उपस्थित • Present" },
                  { name: "Mike Johnson", id: "W003", role: "Heavy Haulage Driver", status: "उपस्थित • Present" },
                  { name: "Emily Davis", id: "W004", role: "Shaft Electrician", status: "उपस्थित • Present" },
                  { name: "Chris Brown", id: "W005", role: "DGMS Inspection Officer", status: "उपस्थित • Present" },
                ].map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-3.5 bg-[#15092A]/90 hover:bg-[#1A0B36] border border-[#F5D061]/25 rounded-xl transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#E11D74] border border-[#F5D061]/50 flex items-center justify-center font-bold text-white text-xs">
                        {worker.id.slice(1)}
                      </div>
                      <div>
                        <p className="font-['Poppins',sans-serif] font-semibold text-sm text-[#FFF8E7]">{worker.name}</p>
                        <p className="text-[11px] font-['Rajdhani',sans-serif] text-[#F5D061]">{worker.role} • ID: {worker.id}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold font-['Rajdhani',sans-serif] text-emerald-300 bg-emerald-950/60 border border-emerald-500/50 rounded-full">
                      {worker.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Performance Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/95 via-[#1E0C38]/95 to-[#120726]/95 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#F5D061]/25">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                    उत्पादन प्रदर्शन • Production Yield
                  </h2>
                </div>
                <Button variant="outline" size="sm" className="border-[#F5D061]/50 text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold uppercase">
                  इस सप्ताह • This Week
                </Button>
              </div>

              <div className="flex gap-4 border-b border-[#F5D061]/20 mb-4 pb-1">
                <button className="text-[#FF7A00] font-bold font-['Rajdhani',sans-serif] border-b-2 border-[#FF7A00] pb-2 text-sm uppercase tracking-wider">
                  कोल उत्पादन • Coal Output
                </button>
                <button className="text-[#FFF8E7]/60 hover:text-[#FFF8E7] font-['Rajdhani',sans-serif] pb-2 text-sm uppercase tracking-wider">
                  कुल ढुलाई • Transport
                </button>
                <button className="text-[#FFF8E7]/60 hover:text-[#FFF8E7] font-['Rajdhani',sans-serif] pb-2 text-sm uppercase tracking-wider">
                  शाफ्ट स्थिति • Shaft Status
                </button>
              </div>

              <div className="h-64 rounded-xl p-5 bg-[#140826]/90 border border-[#F5D061]/25 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 jali-pattern opacity-15"></div>
                <div className="relative z-10 flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#E11D74] border border-[#F5D061] flex items-center justify-center text-xl shadow-lg">
                    📊
                  </div>
                  <div className="font-['Rozha_One',serif] text-xl text-[#F5D061]">2,480 मेट्रिक टन • Daily Peak Reached</div>
                  <div className="text-xs font-['Rajdhani',sans-serif] text-[#FFF8E7]/70 max-w-sm">
                    All 3 shifts operating at optimal yield. Grade-A Anthracite batch dispatched to Bokaro Steel Plant.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Alerts */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/95 via-[#1E0C38]/95 to-[#120726]/95 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md flex flex-col">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#F5D061]/25">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔔</span>
                <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                  सतर्कता सूचना • Alerts
                </h2>
              </div>
              <span className="bg-[#BE123C] border border-[#F5D061] text-[#FFF8E7] text-xs font-['Rajdhani',sans-serif] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                ३ नए • 3 New
              </span>
            </div>

            <div className="space-y-4">
              {alerts.map((alert, index) => {
                const borderStyles = {
                  high: 'bg-red-950/40 border-l-4 border-l-[#BE123C] border-[#BE123C]/50',
                  warning: 'bg-amber-950/40 border-l-4 border-l-[#FF7A00] border-[#FF7A00]/50',
                  info: 'bg-blue-950/40 border-l-4 border-l-[#00A896] border-[#00A896]/50',
                }[alert.type] || 'bg-[#15092A] border-[#F5D061]/40';

                return (
                  <div key={index} className={`p-4 rounded-xl border ${borderStyles} transition-all duration-200 shadow-md`}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#140826] border border-[#F5D061]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm">{alert.type === 'high' ? '🚨' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className="font-['Poppins',sans-serif] font-bold text-sm text-[#FFF8E7] truncate">{alert.title}</h3>
                          <span className="text-[10px] font-['Rajdhani',sans-serif] font-semibold text-[#F5D061] whitespace-nowrap">{alert.time}</span>
                        </div>
                        <p className="text-xs text-[#FFF8E7]/70 font-['Poppins',sans-serif] mt-1 leading-relaxed">{alert.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 