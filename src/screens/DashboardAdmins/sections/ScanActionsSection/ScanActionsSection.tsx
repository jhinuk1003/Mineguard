import {
  AlertCircleIcon,
  CameraIcon,
  CheckIcon,
  UploadIcon,
  ShieldCheck,
  Clock,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { ScanModal } from "../../../../components/ScanModal";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { REQUIRED_EQUIPMENT } from "../../../../Module/geminiService";
import { scanDatabase, ScanSession } from "../../../../Module/scanDatabase";

export const ScanActionsSection = (): JSX.Element => {
  const [currentScan, setCurrentScan] = useState<ScanSession | null>(null);
  const [recentScans, setRecentScans] = useState<ScanSession[]>([]);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadScanData();
  }, []);

  const loadScanData = async () => {
    try {
      const recent = await scanDatabase.getRecentScans(7);
      setRecentScans(recent);
      
      // Set the most recent scan as current scan
      if (recent.length > 0) {
        setCurrentScan(recent[0]);
      }
    } catch (error) {
      console.error('Error loading scan data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanComplete = async (session: ScanSession) => {
    setIsScanModalOpen(false);
    setCurrentScan(session);
    await loadScanData(); // Refresh the data
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'अभी • Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getEquipmentStatus = (equipmentName: string) => {
    if (!currentScan) return { passed: false, confidence: 0 };
    
    const result = currentScan.results.find(r => r.equipmentName === equipmentName);
    return {
      passed: result?.isPresent || false,
      confidence: result?.confidence || 0
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-5 w-full px-6 md:px-10 py-0">
        <Card className="flex-1 min-w-[300px] bg-[#260E45]/90 border-2 border-[#F5D061]/30 text-white">
          <CardContent className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7A00]"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 w-full px-6 md:px-10 py-0">
        {/* Current Scan Card */}
        <div className="flex-1 min-w-[300px] rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 border-b border-[#F5D061]/20 pb-3">
            <div>
              <h3 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00A896]" />
                वर्तमान स्कैन परिणाम • Live Inspection
              </h3>
              <span className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider font-bold">
                AI Vision Pipeline
              </span>
            </div>
            {currentScan && (
              <span className="text-xs font-['Rajdhani',sans-serif] text-[#FF7A00] font-bold bg-[#FF7A00]/15 px-2.5 py-1 rounded-full border border-[#FF7A00]/40">
                {formatTimeAgo(currentScan.timestamp)}
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-5">
            {currentScan ? (
              <>
                <div className="flex flex-col gap-2.5">
                  {REQUIRED_EQUIPMENT.map((equipment, index) => {
                    const status = getEquipmentStatus(equipment.name);
                    return (
                      <div
                        key={`scan-item-${index}`}
                        className="flex items-center justify-between p-3 bg-[#180A30]/85 rounded-xl border border-[#F5D061]/20 hover:border-[#F5D061]/50 transition-all"
                      >
                        <div className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7] flex items-center gap-2">
                          <span className="text-[#F5D061]">✦</span>
                          {equipment.name}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#F5D061]">
                            {status.confidence}%
                          </span>
                          {status.passed ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/50 px-2 py-0.5 rounded-full">
                              <CheckIcon className="w-3.5 h-3.5" />
                              उपस्थित
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-500/50 px-2 py-0.5 rounded-full">
                              <AlertCircleIcon className="w-3.5 h-3.5" />
                              अनुपस्थित
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold rounded-xl border border-[#F5D061]/60 py-2.5 shadow-md"
                    onClick={() => setIsScanModalOpen(true)}
                  >
                    <CameraIcon className="w-5 h-5 text-white" />
                    <span>पुनः स्कैन करें • Scan Again</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#180A30] hover:bg-[#280F4D] text-[#FFF8E7] border border-[#F5D061]/40 rounded-xl font-['Rajdhani',sans-serif] font-bold py-2.5"
                    onClick={() => setIsScanModalOpen(true)}
                  >
                    <UploadIcon className="w-5 h-5 text-[#F5D061]" />
                    <span>तस्वीर अपलोड • Upload</span>
                  </Button>
                </div>

                <div className={`p-3.5 rounded-xl text-center font-['Rajdhani',sans-serif] font-bold text-sm tracking-wider uppercase border ${
                  currentScan.overallPassed 
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                    : 'bg-rose-950/70 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                }`}>
                  {currentScan.overallPassed 
                    ? '✨ सुरक्षा कवच पूर्ण • All Safety Gear Verified' 
                    : '⚠️ सुरक्षा नियम उल्लंघन • Critical Equipment Missing'}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#FFF8E7]/60 font-['Rajdhani',sans-serif] mb-4">कोई स्कैन डेटा उपलब्ध नहीं (No Scan Data)</p>
                <Button 
                  className="bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white font-['Rajdhani',sans-serif] font-bold px-6 py-2 rounded-xl"
                  onClick={() => setIsScanModalOpen(true)}
                >
                  <CameraIcon className="w-4 h-4 mr-2" />
                  पहला स्कैन शुरू करें • Start First Scan
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Scans Card */}
        <div className="w-full lg:w-96 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4 border-b border-[#F5D061]/20 pb-3">
            <div>
              <h3 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                हालिया स्कैन • Recent Scans
              </h3>
              <span className="text-xs font-['Rajdhani',sans-serif] text-[#FF7A00] uppercase tracking-wider font-bold">
                Shift Log
              </span>
            </div>
            <span className="text-xs font-['Rajdhani',sans-serif] bg-[#E11D74]/20 border border-[#E11D74]/40 text-[#F5D061] px-2.5 py-0.5 rounded-full font-bold">
              {recentScans.length} Scans
            </span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {recentScans.length > 0 ? (
              recentScans.slice(0, 6).map((scan, index) => (
                <div
                  key={`recent-scan-${index}`}
                  className="flex items-center justify-between p-3 bg-[#180A30]/85 rounded-xl border border-[#F5D061]/15 hover:bg-[#2A0E4B]/80 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E11D74] flex items-center justify-center shadow-md">
                      <CameraIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7]">
                        स्कैन #{scan.id.slice(-6)}
                      </div>
                      <div className="text-[10px] text-[#FFF8E7]/60 font-mono">
                        {formatTimeAgo(scan.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-['Rajdhani',sans-serif] font-bold border ${
                      scan.overallPassed 
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                        : 'bg-rose-950/60 border-rose-500 text-rose-300'
                    }`}>
                      {scan.overallPassed ? "सफल Pass" : "विफल Fail"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#FFF8E7]/50 text-xs">
                कोई हालिया स्कैन उपलब्ध नहीं
              </div>
            )}
          </div>
        </div>
      </div>

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </>
  );
};
