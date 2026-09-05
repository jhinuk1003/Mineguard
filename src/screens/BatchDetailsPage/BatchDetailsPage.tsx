import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { qrDatabase } from '../../Module/qrDatabase';
import { CoalBatchData } from '../../Module/qrService';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ShieldCheck, ArrowLeft, Sparkles, Scale, MapPin, Clock, Award } from 'lucide-react';

export const BatchDetailsPage = (): JSX.Element => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batch, setBatch] = useState<CoalBatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBatch = async () => {
      if (!batchId) {
        setError('कोई लॉट पहचान संख्या (Batch ID) प्राप्त नहीं हुई।');
        setLoading(false);
        return;
      }
      try {
        const data = await qrDatabase.getBatchById(batchId);
        if (data) {
          setBatch(data);
        } else {
          setError(`लॉट क्रमांक "${batchId}" का कोई आधिकारिक रिकॉर्ड नहीं मिला।`);
        }
      } catch (e) {
        console.error('Error fetching batch data:', e);
        setError('विवरण लोड करने में असमर्थ • Failed to fetch batch details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatch();
  }, [batchId]);

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'premium': return 'bg-emerald-950/70 border border-emerald-500 text-emerald-300';
      case 'standard': return 'bg-amber-950/70 border border-amber-500 text-amber-300';
      case 'low': return 'bg-rose-950/70 border border-rose-500 text-rose-300';
      default: return 'bg-gray-950/70 border border-gray-500 text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#120726] text-white flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-[#F5D061]/20 border-t-[#FF7A00] animate-spin mb-4"></div>
        <p className="font-['Rozha_One',serif] text-2xl text-[#F5D061]">प्रमाणपत्र लोड हो रहा है...</p>
        <p className="font-['Rajdhani',sans-serif] text-sm text-[#FFF8E7]/60">Verifying Cryptographic Consignment Record</p>
      </div>
    );
  }
  
  if (error || !batch) {
    return (
      <div className="w-full h-screen bg-[#120726] text-white flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-950/60 border-2 border-rose-500 flex items-center justify-center mb-4">
          <span className="text-3xl text-rose-400">⚠️</span>
        </div>
        <h1 className="font-['Rozha_One',serif] text-3xl text-rose-400 mb-2">सत्यापन विफल • Verification Failed</h1>
        <p className="font-['Rajdhani',sans-serif] text-base text-[#FFF8E7]/70 max-w-md mb-6">{error || 'The requested consignment could not be found.'}</p>
        <Link to="/dashboard" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white font-['Rajdhani',sans-serif] font-bold">
          डैशबोर्ड पर लौटें • Return to Durbar
        </Link>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen bg-[#120726] text-white p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="marigold-border-top h-3 w-full fixed top-0 left-0 z-50"></div>

      <header className="max-w-4xl mx-auto mb-8 flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF7A00] via-[#E11D74] to-[#F5D061] p-0.5 shadow-[0_0_20px_rgba(255,122,0,0.5)]">
            <div className="w-full h-full bg-[#1A0A30] rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🪨</span>
            </div>
          </div>
          <div>
            <div className="font-['Rozha_One',serif] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00]">
              खान रक्षक • MineGuard
            </div>
            <p className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">
              प्रमाणित कोयला लॉट सत्यापन • Provenance Decree
            </p>
          </div>
        </div>

        <Link 
          to="/dashboard" 
          className="flex items-center gap-1.5 px-4 py-2 bg-[#260E45] border border-[#F5D061]/40 rounded-xl text-xs font-['Rajdhani',sans-serif] font-bold text-[#FFF8E7] hover:border-[#FF7A00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#F5D061]" />
          <span>डैशबोर्ड</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#260E45]/95 via-[#1E0C38]/95 to-[#120726]/95 border-2 border-[#F5D061] shadow-[0_12px_45px_rgba(245,208,97,0.25)]">
          {/* Decorative Corner Filigree */}
          <div className="absolute top-3 left-3 text-xs text-[#F5D061]/60">❖</div>
          <div className="absolute top-3 right-3 text-xs text-[#F5D061]/60">❖</div>
          <div className="absolute bottom-3 left-3 text-xs text-[#F5D061]/60">❖</div>
          <div className="absolute bottom-3 right-3 text-xs text-[#F5D061]/60">❖</div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0 text-center">
              <div className="bg-[#FFF8E7] p-3 rounded-2xl inline-block border-2 border-[#F5D061] shadow-2xl">
                <img src={batch.qrCode} alt={`QR Code for ${batch.id}`} className="w-44 h-44 object-contain" />
              </div>
              <p className="text-[#F5D061] font-mono text-xs font-bold mt-3">{batch.id}</p>
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-['Rajdhani',sans-serif] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                प्रमाणित (Verified)
              </div>
            </div>

            <div className="flex-grow w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#F5D061]" />
                आधिकारिक प्रेषण प्रमाण पत्र • Official Consignment
              </div>
              <h2 className="font-['Rozha_One',serif] text-3xl text-[#FFF8E7] mb-4">
                खनिज लॉट विवरण • Consignment Passport
              </h2>

              <div className="space-y-3 font-['Rajdhani',sans-serif]">
                <div className="flex justify-between items-center p-3.5 bg-[#180A30]/90 rounded-xl border border-[#F5D061]/20">
                  <span className="text-[#FFF8E7]/70 font-bold flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FF7A00]" />
                    गुणवत्ता श्रेणी • Quality Grade:
                  </span>
                  <Badge className={`px-3 py-1 rounded-full font-bold text-xs ${getQualityColor(batch.quality)}`}>
                    ★ {batch.quality} Grade
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#180A30]/90 rounded-xl border border-[#F5D061]/20">
                  <span className="text-[#FFF8E7]/70 font-bold flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#00A896]" />
                    शुद्ध वजन • Net Weight:
                  </span>
                  <span className="text-white font-bold text-base">{batch.weight.toLocaleString()} टन (Tons)</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#180A30]/90 rounded-xl border border-[#F5D061]/20">
                  <span className="text-[#FFF8E7]/70 font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E11D74]" />
                    खदान स्थल • Mine Shaft:
                  </span>
                  <span className="text-[#F5D061] font-bold">{batch.mineLocation}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#180A30]/90 rounded-xl border border-[#F5D061]/20">
                  <span className="text-[#FFF8E7]/70 font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F5D061]" />
                    प्रेषण समय • Dispatch Timestamp:
                  </span>
                  <span className="text-white font-mono text-xs">{batch.dispatchTime.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#F5D061]/20 pt-6 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#180A30] border border-[#00A896] text-emerald-400 font-['Rajdhani',sans-serif] font-bold text-sm shadow-md">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>खान रक्षक प्रणाली द्वारा अधिकृत • DGMS Verified Cryptographic Record</span>
            </div>
            <p className="text-xs text-[#FFF8E7]/50 font-['Rajdhani',sans-serif] mt-2">
              यह डिजिटल अभिलेख खदान नियामक दिशानिर्देशों एवं आंतरिक सुरक्षा लेजर में स्थायी रूप से दर्ज है।
            </p>
          </div>
        </div>
      </main>
      
      <footer className="text-center mt-12 text-[#FFF8E7]/50 text-xs font-['Rajdhani',sans-serif]">
        <p>&copy; {new Date().getFullYear()} खान रक्षक (MineGuard) • भारत सरकार डीजीएमएस अनुपालित</p>
      </footer>
    </div>
  );
}; 