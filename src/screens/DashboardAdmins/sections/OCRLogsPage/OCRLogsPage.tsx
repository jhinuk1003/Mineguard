import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CameraIcon, CheckIcon, DownloadIcon, FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { OcrScannerModal } from "../../../../components/OcrScannerModal";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { geminiService } from "../../../../Module/geminiService";
import { OcrScan, ocrDatabase } from "../../../../Module/ocrDatabase";

function parseMarkdownTable(md: string): { head: string[]; body: string[][] } | null {
  // Simple parser for markdown tables
  const lines = md.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return null;
  const head = lines[0].split("|").map(s => s.trim()).filter(Boolean);
  const body = lines.slice(2).map(line => line.split("|").map(s => s.trim()).filter(Boolean));
  return { head, body };
}

export const OCRLogsPage = (): JSX.Element => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [recentScans, setRecentScans] = useState<OcrScan[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    const scans = await ocrDatabase.getRecentOcrScans(5);
    setRecentScans(scans);
  };

  const handleScanComplete = (scan: OcrScan) => {
    console.log("OCR Scan complete", scan);
    setRecentScans((prev) => [scan, ...prev].slice(0, 5));
  };

  const handleDownloadPdf = async (scan: OcrScan) => {
    setDownloadingId(scan.id);
    let tableMd = "";
    try {
      // Use Gemini to convert extracted text to markdown table
      tableMd = await geminiService.performTableExtraction(scan.extractedText);
    } catch (err) {
      tableMd = "";
    }
    let table = tableMd ? parseMarkdownTable(tableMd) : null;
    const doc = new jsPDF();
    doc.text(`Document: ${scan.filename}`, 14, 16);
    doc.setFontSize(10);
    doc.text(`Scanned: ${new Date(scan.timestamp).toLocaleString()}`, 14, 22);
    if (scan.note) {
      doc.setFontSize(11);
      doc.text("Note:", 14, 30);
      doc.setFontSize(10);
      doc.text(scan.note, 14, 36, { maxWidth: 180 });
    }
    let y = scan.note ? 44 : 30;
    if (table && table.body.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [table.head],
        body: table.body,
      });
    } else {
      doc.text("Extracted Text:", 14, y);
      doc.setFontSize(10);
      doc.text(scan.extractedText, 14, y + 6, { maxWidth: 180 });
    }
    doc.save(`${scan.filename || 'ocr_scan'}.pdf`);
    setDownloadingId(null);
  };

  return (
    <>
      <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-[#120726] via-[#1A0A30] to-[#120726] text-white min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1F0838]/95 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-[0_8px_32px_rgba(225,29,116,0.25)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase mb-2">
              <span>✦ कृत्रिम बुद्धिमत्ता दस्तावेज़ दृष्टि ✦</span>
              <span>Handwritten Mining Slips AI Scanner</span>
            </div>
            <h1 className="font-['Rozha_One',serif] text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00] flex items-center gap-3">
              <CameraIcon className="w-8 h-8 text-[#FF7A00]" />
              दस्तावेज़ ओसीआर स्कैनर • Document Vision
            </h1>
            <p className="text-[#FFF8E7]/70 font-['Rajdhani',sans-serif] text-sm md:text-base mt-1">
              Extract tabular data from challans, handwritten shift receipts & safety certificates via Gemini Vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Start Scanner Card */}
            <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/40 p-6 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF7A00]/20 to-[#E11D74]/20 border-2 border-[#FF7A00] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,122,0,0.3)]">
                <CameraIcon className="w-9 h-9 text-[#F5D061]" />
              </div>
              <h3 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-1">पर्ची स्कैन करें</h3>
              <p className="text-xs font-['Rajdhani',sans-serif] text-[#FFF8E7]/70 mb-5">
                Scan handwritten weighbridge slips, shift notes & fuel logs
              </p>
              <Button
                className="bg-gradient-to-r from-[#FF7A00] to-[#E11D74] hover:opacity-90 text-white font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider rounded-xl px-8 py-3 text-sm transition-all border border-[#F5D061]/60 shadow-[0_0_15px_rgba(225,29,116,0.4)]"
                onClick={() => setIsScannerOpen(true)}
              >
                स्कैनर चालू करें • Start Scanner
              </Button>
            </div>

            {/* Recent Scans */}
            <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/35 p-6 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center mb-5 border-b border-[#F5D061]/20 pb-3">
                <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5 text-[#00A896]" />
                  हालिया डिजिटल स्कैन • Processed Records
                </h2>
                <span className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider font-bold">
                  {recentScans.length} Scans Archived
                </span>
              </div>
              
              <div className="space-y-3">
                {recentScans.length > 0 ? (
                  recentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-3.5 bg-[#180A30]/85 rounded-xl border border-[#F5D061]/20 hover:border-[#FF7A00]/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#E11D74]/20 border border-[#E11D74] flex items-center justify-center">
                          <FileTextIcon className="w-5 h-5 text-[#F5D061]" />
                        </div>
                        <div>
                          <span className="font-['Rajdhani',sans-serif] font-bold text-sm text-[#FFF8E7] block">{scan.filename}</span>
                          <span className="text-[10px] text-[#FFF8E7]/60 font-mono">
                            {new Date(scan.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="border border-[#F5D061]/40 bg-[#260E45] hover:bg-[#391566] text-[#F5D061] rounded-lg"
                          onClick={() => handleDownloadPdf(scan)}
                          disabled={downloadingId === scan.id}
                          title="Download PDF"
                        >
                          {downloadingId === scan.id ? (
                            <svg className="animate-spin h-4 w-4 text-[#F5D061]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="#F5D061" d="M4 12a8 8 0 018-8v8z" /></svg>
                          ) : (
                            <DownloadIcon className="w-4 h-4 text-[#F5D061]" />
                          )}
                        </Button>
                        <span className="p-1 rounded bg-emerald-950/70 border border-emerald-500 text-emerald-400">
                          <CheckIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-[#180A30]/60 rounded-xl border border-[#F5D061]/15 text-[#FFF8E7]/50 font-['Rajdhani',sans-serif]">
                    कोई हालिया स्कैन उपलब्ध नहीं। पर्ची स्कैन करने के लिए बाईं ओर बटन दबाएं।
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OcrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </>
  );
}; 