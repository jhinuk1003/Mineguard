
import { Calendar, Clock, Users, Wrench, PlusCircle, UserCheck } from "lucide-react";

export const SchedulePage = (): JSX.Element => {
  const shifts = [
    {
      id: 1,
      name: "प्रातः पाली • Morning Shift",
      time: "06:00 - 14:00",
      workers: 25,
      status: "active",
      statusLabel: "सक्रिय • Active",
      gemColor: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300",
      equipment: ["Truck A-1234 (गजराज)", "Excavator E-5678 (भीम)", "Loader L-9012"]
    },
    {
      id: 2,
      name: "अपराह्न पाली • Afternoon Shift",
      time: "14:00 - 22:00",
      workers: 22,
      status: "upcoming",
      statusLabel: "आगामी • Upcoming",
      gemColor: "border-amber-500/60 bg-amber-950/40 text-amber-300",
      equipment: ["Truck A-1235 (चेतक)", "Excavator E-5679 (ऐरावत)", "Loader L-9013"]
    },
    {
      id: 3,
      name: "रात्रि पाली • Night Shift",
      time: "22:00 - 06:00",
      workers: 18,
      status: "scheduled",
      statusLabel: "निर्धारित • Scheduled",
      gemColor: "border-indigo-500/60 bg-indigo-950/40 text-indigo-300",
      equipment: ["Truck A-1236 (गरुड़)", "Excavator E-5680 (वज्र)", "Loader L-9014"]
    }
  ];

  const weeklySchedule = [
    { day: "सोमवार • Monday", shifts: ["प्रातः Morning", "अपराह्न Afternoon", "रात्रि Night"] },
    { day: "मंगलवार • Tuesday", shifts: ["प्रातः Morning", "अपराह्न Afternoon", "रात्रि Night"] },
    { day: "बुधवार • Wednesday", shifts: ["प्रातः Morning", "अपराह्न Afternoon", "रात्रि Night"] },
    { day: "गुरुवार • Thursday", shifts: ["प्रातः Morning", "अपराह्न Afternoon", "रात्रि Night"] },
    { day: "शुक्रवार • Friday", shifts: ["प्रातः Morning", "अपराह्न Afternoon", "रात्रि Night"] },
    { day: "शनिवार • Saturday", shifts: ["प्रातः Morning", "अपराह्न Afternoon"] },
    { day: "रविवार • Sunday", shifts: ["प्रातः Morning (रखरखाव Maintenance)"] }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-[#120726] via-[#1A0A30] to-[#120726] text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1F0838]/95 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-[0_8px_32px_rgba(225,29,116,0.25)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase mb-2">
                <span>✦ रोस्टर प्रबंधन ✦</span>
                <span>Mine Shift Operations</span>
              </div>
              <h1 className="font-['Rozha_One',serif] text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00]">
                पाली एवं समय-सारणी प्रबंधन
              </h1>
              <p className="text-[#FFF8E7]/70 font-['Rajdhani',sans-serif] text-sm md:text-base mt-1">
                Duty Rosters, Miner Allocation & Heavy Machinery Schedules (DGMS Approved)
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#2D1254] px-4 py-2 rounded-xl border border-[#F5D061]/40">
              <Calendar className="w-5 h-5 text-[#F5D061]" />
              <span className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7]">
                सप्ताह 36 • {new Date().toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Current Shifts & Weekly Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Shift Rosters */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 border-b border-[#F5D061]/20 pb-3">
              <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF7A00]" />
                वर्तमान पालियाँ • Active Mine Shifts
              </h2>
              <span className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider font-bold">3 Shits / 24h</span>
            </div>
            <div className="space-y-4">
              {shifts.map((shift) => (
                <div key={shift.id} className="p-4 rounded-xl bg-[#180A30]/90 border border-[#F5D061]/25 hover:border-[#FF7A00]/60 transition-all shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-['Rajdhani',sans-serif] font-bold text-base md:text-lg text-[#FFF8E7]">{shift.name}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold font-['Rajdhani',sans-serif] border ${shift.gemColor}`}>
                      {shift.statusLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-['Rajdhani',sans-serif] text-[#FFF8E7]/80 mb-3">
                    <span className="flex items-center gap-1.5 text-[#F5D061]">
                      <Clock className="w-3.5 h-3.5 text-[#FF7A00]" /> {shift.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-white">
                      <Users className="w-3.5 h-3.5 text-[#00A896]" /> {shift.workers} खनिक (Miners)
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider font-bold mb-1.5">
                      संलग्न उपकरण • Assigned Machinery:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {shift.equipment.map((item, index) => (
                        <span key={index} className="px-2.5 py-1 bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold rounded-lg flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-[#FF7A00]" /> {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 border-b border-[#F5D061]/20 pb-3">
              <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00A896]" />
                साप्ताहिक समय-सारणी • Weekly Roster
              </h2>
              <span className="text-xs font-['Rajdhani',sans-serif] text-[#E11D74] uppercase tracking-wider font-bold">7-Day Cycle</span>
            </div>
            <div className="space-y-2.5">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#180A30]/80 rounded-xl border border-[#F5D061]/15 hover:bg-[#2A0E4B]/80 transition-colors gap-2">
                  <span className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7]">{day.day}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {day.shifts.map((shift, shiftIndex) => (
                      <span key={shiftIndex} className="px-2 py-0.5 bg-[#E11D74]/20 border border-[#E11D74]/40 text-[#FFF8E7] text-xs font-['Rajdhani',sans-serif] font-bold rounded">
                        {shift}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl">
          <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-4 flex items-center gap-2">
            <span>त्वरित आदेश • Rapid Shift Dispatch</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group p-4 bg-gradient-to-r from-[#FF7A00]/25 to-[#E11D74]/25 border-2 border-[#FF7A00] rounded-xl hover:bg-gradient-to-r hover:from-[#FF7A00]/40 hover:to-[#E11D74]/40 transition-all flex items-center space-x-3 text-left">
              <PlusCircle className="w-7 h-7 text-[#FF7A00] group-hover:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-white font-['Rajdhani',sans-serif] font-bold text-base">नई पाली जोड़ें</div>
                <div className="text-xs text-[#F5D061]">Create New Shift</div>
              </div>
            </button>
            <button className="group p-4 bg-[#1F0A38] border-2 border-[#00A896]/60 rounded-xl hover:border-[#00A896] hover:bg-[#00A896]/20 transition-all flex items-center space-x-3 text-left">
              <UserCheck className="w-7 h-7 text-[#00A896] group-hover:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-white font-['Rajdhani',sans-serif] font-bold text-base">खनिक आवंटित करें</div>
                <div className="text-xs text-[#00A896]">Assign Miners</div>
              </div>
            </button>
            <button className="group p-4 bg-[#1F0A38] border-2 border-[#F5D061]/50 rounded-xl hover:border-[#F5D061] hover:bg-[#F5D061]/20 transition-all flex items-center space-x-3 text-left">
              <Wrench className="w-7 h-7 text-[#F5D061] group-hover:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-white font-['Rajdhani',sans-serif] font-bold text-base">उपकरण तय करें</div>
                <div className="text-xs text-[#F5D061]">Schedule Heavy Machinery</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 