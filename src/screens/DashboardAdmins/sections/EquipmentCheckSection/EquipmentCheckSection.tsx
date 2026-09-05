import { CameraIcon, History, Sparkles } from "lucide-react";
import { useState } from "react";
import { ScanModal } from "../../../../components/ScanModal";
import { Button } from "../../../../components/ui/button";
import { ScanSession } from "../../../../Module/scanDatabase";

interface EquipmentCheckSectionProps {
  onScanComplete?: (session: ScanSession) => void;
}

export const EquipmentCheckSection = ({ onScanComplete }: EquipmentCheckSectionProps): JSX.Element => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleScanComplete = (session: ScanSession) => {
    setIsScanModalOpen(false);
    if (onScanComplete) {
      onScanComplete(session);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between px-6 md:px-10 py-5 gap-4">
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>एआई सुरक्षा कवच • AI Safety Shield</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-['Rozha_One',serif] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00]">
            खनिक उपकरण जांच • Gear & PPE Check
          </h2>
          <p className="text-xs md:text-sm font-['Rajdhani',sans-serif] text-[#FFF8E7]/70">
            Real-time AI verification of mandatory safety gear, helmet & harness compliance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 bg-[#260E45]/80 hover:bg-[#34135E] border border-[#F5D061]/40 rounded-xl text-[#FFF8E7] font-['Rajdhani',sans-serif] font-bold"
          >
            <History className="w-4 h-4 text-[#F5D061]" />
            <span>इतिहास • History</span>
          </Button>

          <Button 
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 rounded-xl border border-[#F5D061]/60 text-white font-['Rajdhani',sans-serif] font-bold shadow-[0_0_15px_rgba(225,29,116,0.4)]"
            onClick={() => setIsScanModalOpen(true)}
          >
            <CameraIcon className="w-5 h-5 text-white" />
            <span>स्कैन प्रारंभ करें • Start Scan</span>
          </Button>
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
