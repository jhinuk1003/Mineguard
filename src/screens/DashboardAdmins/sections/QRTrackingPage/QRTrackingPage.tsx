import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { qrService, CoalBatchData, QRGenerationRequest } from '../../../../Module/qrService';
import { qrDatabase } from '../../../../Module/qrDatabase';
import { config } from '../../../../config/environment';
import { QRScanner } from '../../../../components/QRScanner';
import { QrCode, Sparkles, Download, Scan, FileText, CheckCircle2, ShieldCheck, Scale, MapPin } from 'lucide-react';

export const QRTrackingPage = (): JSX.Element => {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showQRForm, setShowQRForm] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedBatch, setScannedBatch] = useState<CoalBatchData | null>(null);
  const [newlyGeneratedBatch, setNewlyGeneratedBatch] = useState<CoalBatchData | null>(null);
  const [coalBatches, setCoalBatches] = useState<CoalBatchData[]>([]);
  const [batchStats, setBatchStats] = useState({
    totalBatches: 0,
    totalWeight: 0,
    qualityDistribution: {} as Record<string, number>,
    locationDistribution: {} as Record<string, number>,
    averageWeight: 0
  });
  const [formData, setFormData] = useState({
    weight: '',
    quality: '',
    mineLocation: '',
    dispatchTime: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    loadBatches();
    loadStats();
  }, []);

  const loadBatches = async () => {
    try {
      const batches = await qrDatabase.getRecentBatches(20);
      setCoalBatches(batches);
    } catch (error) {
      console.error('Error loading batches:', error);
    }
  };

  const loadStats = async () => {
    try {
      const stats = await qrDatabase.getBatchStats();
      setBatchStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQRCode = async () => {
    if (!formData.weight || !formData.quality || !formData.mineLocation || !formData.dispatchTime) {
      alert('कृपया सभी विवरण भरें • Please fill in all fields');
      return;
    }

    setIsGeneratingQR(true);
    
    try {
      const request: QRGenerationRequest = {
        weight: parseFloat(formData.weight),
        quality: formData.quality,
        mineLocation: formData.mineLocation,
        dispatchTime: new Date(formData.dispatchTime)
      };

      const validation = await qrService.validateBatchData(request);
      if (!validation.isValid) {
        alert(`त्रुटि (Errors):\n${validation.errors.join('\n')}`);
        return;
      }

      const newBatch = await qrService.createCoalBatch(request);
      await qrDatabase.saveCoalBatch(newBatch);
      
      setCoalBatches(prev => [newBatch, ...prev]);
      setFormData({
        weight: '',
        quality: '',
        mineLocation: '',
        dispatchTime: new Date().toISOString().slice(0, 16)
      });
      setShowQRForm(false);
      await loadStats();
      setNewlyGeneratedBatch(newBatch);
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('QR Code generation failed. Please try again.');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const downloadQRCode = async (batch: CoalBatchData) => {
    try {
      await qrService.downloadQRCode(batch.qrCode, batch.id);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code');
    }
  };

  const downloadPDF = async (batch: CoalBatchData) => {
    try {
      await qrService.generateAndDownloadPDF(batch);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to generate or download PDF');
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'premium': return 'bg-emerald-950/70 border border-emerald-500 text-emerald-300';
      case 'standard': return 'bg-amber-950/70 border border-amber-500 text-amber-300';
      case 'low': return 'bg-rose-950/70 border border-rose-500 text-rose-300';
      default: return 'bg-gray-950/70 border border-gray-500 text-gray-300';
    }
  };

  const qualityOptions = qrService.getQualityOptions();
  const mineLocationOptions = qrService.getMineLocationOptions();

  const handleQRScan = async (scannedData: any) => {
    try {
      const batch = await qrDatabase.getBatchById(scannedData.id);
      if (batch) {
        setScannedBatch(batch);
        setShowQRScanner(false);
      } else {
        alert('डेटाबेस में कोई लॉट नहीं मिला (Batch not found in database).');
      }
    } catch (error) {
      console.error('Error processing scanned QR:', error);
      alert('Error processing QR code. Please try again.');
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-[#120726] via-[#1A0A30] to-[#120726] text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1F0838]/95 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-[0_8px_32px_rgba(225,29,116,0.25)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase mb-2">
                <span>✦ डिजिटल लॉट पासपोर्ट ✦</span>
                <span>Cryptographic Batch Provenance</span>
              </div>
              <h1 className="font-['Rozha_One',serif] text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00] flex items-center gap-3">
                <QrCode className="w-8 h-8 text-[#FF7A00]" />
                क्यूआर लॉजिस्टिक्स एवं प्रेषण ट्रैकिंग
              </h1>
              <p className="text-[#FFF8E7]/70 font-['Rajdhani',sans-serif] text-sm md:text-base mt-1">
                Tamper-Evident QR Seals, Immutable Mineral Tracking & Official DGMS Consignment Passports
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setShowQRForm(true)}
                className="bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl border border-[#F5D061]/60 shadow-[0_0_15px_rgba(225,29,116,0.4)] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#F5D061]" />
                नया क्यूआर बनाएं • Generate QR
              </Button>
              <Button
                onClick={() => setShowQRScanner(true)}
                variant="outline"
                className="border-2 border-[#00A896]/60 bg-[#180A30] text-[#00A896] hover:bg-[#00A896]/20 font-['Rajdhani',sans-serif] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2"
              >
                <Scan className="w-4 h-4 text-[#00A896]" />
                स्कैन करें • Scan QR
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats (Navratna Gem Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/50 shadow-lg backdrop-blur-md">
            <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">कुल प्रेषित लॉट • Total Batches</p>
            <p className="text-3xl font-['Rozha_One',serif] text-[#F5D061] mt-1">{batchStats.totalBatches}</p>
            <p className="text-xs text-[#00A896] font-['Rajdhani',sans-serif] mt-0.5">सत्यापित कंसाइनमेंट (Verified)</p>
          </div>
          
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#00A896]/50 shadow-lg backdrop-blur-md">
            <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">कुल वजन • Total Weight</p>
            <p className="text-3xl font-['Rozha_One',serif] text-[#00A896] mt-1">
              {batchStats.totalWeight.toLocaleString()} <span className="text-sm font-sans">टन</span>
            </p>
            <p className="text-xs text-[#FFF8E7]/60 font-['Rajdhani',sans-serif] mt-0.5">Heavy Freight Output</p>
          </div>
          
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#E11D74]/50 shadow-lg backdrop-blur-md">
            <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">सर्वोच्च गुणवत्ता • Premium Grade</p>
            <p className="text-3xl font-['Rozha_One',serif] text-[#E11D74] mt-1">
              {batchStats.qualityDistribution['Premium'] || 0}
            </p>
            <p className="text-xs text-[#F5D061] font-['Rajdhani',sans-serif] mt-0.5">High GCV Standard Batches</p>
          </div>
          
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#FF7A00]/50 shadow-lg backdrop-blur-md">
            <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider">औसत वजन • Average Batch</p>
            <p className="text-3xl font-['Rozha_One',serif] text-[#FF7A00] mt-1">
              {Math.round(batchStats.averageWeight).toLocaleString()} <span className="text-sm font-sans">टन</span>
            </p>
            <p className="text-xs text-[#FFF8E7]/60 font-['Rajdhani',sans-serif] mt-0.5">Per Hauler Consignment</p>
          </div>
        </div>

        {/* QR Generation Form */}
        {showQRForm && (
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#260E45]/95 via-[#1F0838]/95 to-[#120726]/95 border-2 border-[#FF7A00] shadow-[0_0_30px_rgba(255,122,0,0.3)]">
            <div className="flex items-center justify-between mb-5 border-b border-[#F5D061]/20 pb-3">
              <h2 className="font-['Rozha_One',serif] text-2xl text-[#FFF8E7] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#F5D061]" />
                नया कोयला लॉट क्यूआर जारी करें • Generate Batch Passport
              </h2>
              <button 
                onClick={() => setShowQRForm(false)}
                className="text-[#FFF8E7]/60 hover:text-[#FFF8E7] font-bold text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#F5D061] mb-2">वजन टन में • Weight (Tons)</label>
                <Input
                  type="number"
                  placeholder="उदा. 450.5"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-[#180A30] border-2 border-[#F5D061]/40 focus:border-[#FF7A00] text-white rounded-xl h-11"
                  max={config.qrTracking.maxWeight}
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#F5D061] mb-2">गुणवत्ता श्रेणी • Quality Grade</label>
                <select
                  value={formData.quality}
                  onChange={(e) => handleInputChange('quality', e.target.value)}
                  className="w-full px-3 h-11 bg-[#180A30] border-2 border-[#F5D061]/40 focus:border-[#FF7A00] rounded-xl text-white font-['Rajdhani',sans-serif] font-bold"
                >
                  <option value="">श्रेणी चुनें • Select Grade</option>
                  {qualityOptions.map(quality => (
                    <option key={quality} value={quality}>{quality} Grade</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#F5D061] mb-2">खदान स्थल • Mining Shaft Location</label>
                <select
                  value={formData.mineLocation}
                  onChange={(e) => handleInputChange('mineLocation', e.target.value)}
                  className="w-full px-3 h-11 bg-[#180A30] border-2 border-[#F5D061]/40 focus:border-[#FF7A00] rounded-xl text-white font-['Rajdhani',sans-serif] font-bold"
                >
                  <option value="">खदान स्थल चुनें • Select Mine</option>
                  {mineLocationOptions.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#F5D061] mb-2">प्रेषण समय • Dispatch Timestamp</label>
                <Input
                  type="datetime-local"
                  value={formData.dispatchTime}
                  onChange={(e) => handleInputChange('dispatchTime', e.target.value)}
                  className="bg-[#180A30] border-2 border-[#F5D061]/40 focus:border-[#FF7A00] text-white rounded-xl h-11"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={generateQRCode}
                disabled={isGeneratingQR}
                className="bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase px-6 py-2.5 rounded-xl border border-[#F5D061]/70"
              >
                {isGeneratingQR ? 'क्यूआर तैयार हो रहा है...' : 'क्यूआर एवं चालान बनाएं • Generate'}
              </Button>
              <Button
                onClick={() => setShowQRForm(false)}
                variant="outline"
                className="border border-[#F5D061]/30 bg-[#180A30] text-[#FFF8E7] hover:bg-[#280F4D] rounded-xl font-['Rajdhani',sans-serif] font-bold px-6"
              >
                रद्द करें • Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Coal Batches List */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 shadow-xl">
          <div className="flex items-center justify-between mb-6 border-b border-[#F5D061]/20 pb-3">
            <div>
              <h2 className="font-['Rozha_One',serif] text-2xl text-[#FFF8E7]">
                हालिया प्रेषित लॉट • Consignment Archive
              </h2>
              <p className="text-xs font-['Rajdhani',sans-serif] text-[#FF7A00] uppercase tracking-wider font-bold">
                Signed Mineral Provenance Records
              </p>
            </div>
            <span className="text-xs font-['Rajdhani',sans-serif] bg-[#E11D74]/20 border border-[#E11D74]/50 text-[#F5D061] px-3 py-1 rounded-full font-bold">
              {coalBatches.length} Batches Logged
            </span>
          </div>

          {coalBatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#FFF8E7]/60 font-['Rajdhani',sans-serif]">कोई कंसाइनमेंट नहीं मिला। अपना पहला क्यूआर कोड बनाएं!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {coalBatches.map((batch) => (
                <div key={batch.id} className="p-5 rounded-2xl bg-[#180A30]/90 border-2 border-[#F5D061]/25 hover:border-[#FF7A00]/50 transition-all shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#FFF8E7] p-1.5 rounded-xl flex items-center justify-center border-2 border-[#F5D061] shadow-md flex-shrink-0">
                        <img src={batch.qrCode} alt={`QR Code for ${batch.id}`} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF7A00] font-['Rajdhani',sans-serif] font-bold text-xs uppercase tracking-wider">बैच • BATCH:</span>
                          <h3 className="font-mono font-bold text-[#F5D061] text-base">{batch.id}</h3>
                        </div>
                        <p className="text-[#FFF8E7]/70 text-xs font-['Rajdhani',sans-serif] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#00A896]" /> {batch.mineLocation}
                        </p>
                      </div>
                    </div>
                    <Badge className={`px-3 py-1 rounded-full font-['Rajdhani',sans-serif] font-bold text-xs self-start sm:self-auto ${getQualityColor(batch.quality)}`}>
                      ★ {batch.quality} Grade
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-[#120726]/80 rounded-xl border border-[#F5D061]/15 mb-4 text-xs font-['Rajdhani',sans-serif]">
                    <div>
                      <span className="text-[#FFF8E7]/60 block font-bold uppercase tracking-wider">वजन • Weight:</span>
                      <p className="text-white font-bold text-sm mt-0.5">{batch.weight.toLocaleString()} टन</p>
                    </div>
                    <div>
                      <span className="text-[#FFF8E7]/60 block font-bold uppercase tracking-wider">प्रेषण • Time:</span>
                      <p className="text-[#F5D061] font-mono text-xs mt-0.5">
                        {batch.dispatchTime.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#FFF8E7]/60 block font-bold uppercase tracking-wider">स्थिति • Status:</span>
                      <p className="text-emerald-400 font-bold mt-0.5">● सक्रिय (Active Dispatch)</p>
                    </div>
                    <div>
                      <span className="text-[#FFF8E7]/60 block font-bold uppercase tracking-wider">दस्तावेज़ • Report:</span>
                      <p className="text-[#00A896] font-bold mt-0.5">✓ चालान उपलब्ध (Ready)</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => downloadQRCode(batch)}
                      variant="outline"
                      size="sm"
                      className="border border-[#F5D061]/40 bg-[#260E45] text-[#F5D061] hover:bg-[#381466] font-['Rajdhani',sans-serif] font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      क्यूआर डाउनलोड (PNG)
                    </Button>
                    <Button
                      onClick={() => downloadPDF(batch)}
                      variant="outline"
                      size="sm"
                      className="border border-[#00A896]/50 bg-[#00A896]/20 text-[#00A896] hover:bg-[#00A896]/30 font-['Rajdhani',sans-serif] font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      चालान पीडीएफ (PDF)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scanned Batch Details Card */}
        {scannedBatch && (
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#260E45]/95 via-[#1F0838]/95 to-[#120726]/95 border-2 border-[#00A896] shadow-[0_0_30px_rgba(0,168,150,0.3)]">
            <div className="flex items-center justify-between mb-4 border-b border-[#00A896]/30 pb-3">
              <h2 className="font-['Rozha_One',serif] text-2xl text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                स्कैन किया गया कंसाइनमेंट विवरण • Verified Batch
              </h2>
              <Button
                onClick={() => setScannedBatch(null)}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
              >
                बंद करें • Close
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-sm font-['Rajdhani',sans-serif]">
                <div className="flex justify-between p-2 bg-[#180A30] rounded-lg">
                  <span className="text-[#FFF8E7]/70 font-bold">लॉट आईडी Batch ID:</span>
                  <span className="font-mono text-[#F5D061] font-bold">{scannedBatch.id}</span>
                </div>
                <div className="flex justify-between p-2 bg-[#180A30] rounded-lg">
                  <span className="text-[#FFF8E7]/70 font-bold">वजन Weight:</span>
                  <span className="text-white font-bold">{scannedBatch.weight.toLocaleString()} टन</span>
                </div>
                <div className="flex justify-between p-2 bg-[#180A30] rounded-lg">
                  <span className="text-[#FFF8E7]/70 font-bold">गुणवत्ता Grade:</span>
                  <Badge className={getQualityColor(scannedBatch.quality)}>
                    {scannedBatch.quality}
                  </Badge>
                </div>
                <div className="flex justify-between p-2 bg-[#180A30] rounded-lg">
                  <span className="text-[#FFF8E7]/70 font-bold">स्थान Location:</span>
                  <span className="text-white font-bold">{scannedBatch.mineLocation}</span>
                </div>
                <div className="flex justify-between p-2 bg-[#180A30] rounded-lg">
                  <span className="text-[#FFF8E7]/70 font-bold">समय Dispatch:</span>
                  <span className="font-mono text-white">{scannedBatch.dispatchTime.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => downloadPDF(scannedBatch)}
                  className="w-full bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold py-3 rounded-xl shadow-lg"
                >
                  डिजिटल चालान डाउनलोड • Download PDF Report
                </Button>
                <Button
                  onClick={() => downloadQRCode(scannedBatch)}
                  variant="outline"
                  className="w-full border-2 border-[#F5D061]/50 bg-[#180A30] text-[#F5D061] hover:bg-[#2E1254] font-['Rajdhani',sans-serif] font-bold py-3 rounded-xl"
                >
                  क्यूआर कोड डाउनलोड • Download QR Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Modal */}
        <QRScanner
          isOpen={showQRScanner}
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />

        {/* Newly Generated QR Code Popup */}
        {newlyGeneratedBatch && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#260E45] via-[#1E0C38] to-[#120726] border-2 border-[#F5D061] shadow-[0_0_40px_rgba(245,208,97,0.4)] max-w-sm w-full text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold uppercase mb-3">
                <span>✦ प्रमाणित कंसाइनमेंट ✦</span>
              </div>
              <h2 className="font-['Rozha_One',serif] text-2xl text-[#FFF8E7] mb-4">
                क्यूआर कोड जारी हुआ!
              </h2>
              <div className="bg-[#FFF8E7] p-4 rounded-2xl inline-block mb-4 border-2 border-[#F5D061] shadow-xl">
                <img 
                  src={newlyGeneratedBatch.qrCode} 
                  alt={`QR Code for ${newlyGeneratedBatch.id}`} 
                  className="w-48 h-48 mx-auto" 
                />
              </div>
              <p className="text-[#F5D061] font-mono text-xs font-bold mb-6">{newlyGeneratedBatch.id}</p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => downloadQRCode(newlyGeneratedBatch)}
                  className="w-full bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold py-2.5 rounded-xl border border-[#F5D061]/60"
                >
                  क्यूआर डाउनलोड • Download QR
                </Button>
                <Button
                  onClick={() => setNewlyGeneratedBatch(null)}
                  variant="outline"
                  className="w-full border border-[#F5D061]/40 bg-[#180A30] text-[#FFF8E7] hover:bg-[#291150] font-['Rajdhani',sans-serif] font-bold py-2.5 rounded-xl"
                >
                  सम्पन्न • Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};