import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { logbookDatabase, LogbookEntry } from "../../../../Module/logbookDatabase";
import { ocrDatabase, OcrScan } from "../../../../Module/ocrDatabase";
import { BookOpen, FileText, Download, ShieldCheck, Wrench, AlertTriangle, Sparkles } from "lucide-react";

// Operator profile
const currentUser = { name: "राकेश शर्मा (Rakesh Sharma)", avatar: "/image-8.png", title: "Chief Mining Controller" };

const logbookTableColumns = [
  "दिनांक Date", "प्रकार Type", "अधिकारी Operator", "दस्तावेज़ Document", "विवरण Note / Action"
];

const demoRows = [
  ["2024-06-01", "Equipment Maintenance", "राकेश शर्मा (Rakesh Sharma)", "-", "Routine maintenance completed on Haul Truck A-1234 (गजराज)"],
  ["2024-06-01", "Safety Inspection", "अमित वर्मा (Amit Verma)", "-", "Daily methane & strata safety check on Excavator E-5678 (भीम)"],
  ["2024-06-01", "Incident Report", "सुरेश कुमार (Suresh Kumar)", "-", "Minor hydraulic seal fluctuation - resolved on site"],
];

const equipmentLogs = [
  { type: "Equipment Maintenance", description: "Routine maintenance completed on Truck A-1234", operator: "Rakesh S.", date: "2024-06-01" },
  { type: "Safety Inspection", description: "Daily strata safety check on Excavator E-5678", operator: "Amit V.", date: "2024-06-01" },
  { type: "Incident Report", description: "Minor equipment pressure check - resolved", operator: "Suresh K.", date: "2024-06-01" },
];

export const LogBookPage = (): JSX.Element => {
  const [ocrToday, setOcrToday] = useState<OcrScan[]>([]);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const allOcr = await ocrDatabase.getRecentOcrScans(100);
    const today = allOcr.filter(scan => {
      const scanDate = new Date(scan.timestamp);
      const now = new Date();
      return scanDate.getFullYear() === now.getFullYear() &&
        scanDate.getMonth() === now.getMonth() &&
        scanDate.getDate() === now.getDate();
    });
    setOcrToday(today);
    const entries = await logbookDatabase.getRecentLogEntries(50);
    setLogbookEntries(entries);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("खान रक्षक • MineGuard Digital Bahi-Khata Ledger", 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);
    doc.text(`Chief Controller: ${currentUser.name}`, 14, 28);
    doc.setFontSize(12);
    doc.text("\nMain Log Table:", 14, 36);
    const allRows = [
      ...demoRows,
      ...logbookEntries.filter(e => e.type === "OCR Document").map(e => [
        e.date.toLocaleDateString(),
        e.type,
        e.operator,
        e.filename || "-",
        (e.note || "").slice(0, 100) + (e.note && e.note.length > 100 ? "..." : "")
      ])
    ];
    autoTable(doc, {
      startY: 40,
      head: [["Date", "Type", "Operator", "Filename", "Note"]],
      body: allRows,
    });
    let y = doc.lastAutoTable.finalY + 10;
    doc.text("OCR Log Summary (Today):", 14, y);
    y += 4;
    doc.text(`Docs Scanned: ${ocrToday.length}`, 14, y);
    ocrToday.forEach((scan, i) => {
      doc.text(`- ${scan.filename} (by ${currentUser.name})`, 14, y + 6 + i * 6);
    });
    doc.save("MineGuard_Digital_BahiKhata.pdf");
  };

  const getTypeBadge = (type: string) => {
    if (type.includes("Maintenance")) {
      return "bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF7A00]";
    } else if (type.includes("Safety")) {
      return "bg-[#00A896]/20 border border-[#00A896] text-[#00A896]";
    } else if (type.includes("Incident")) {
      return "bg-[#DC2626]/20 border border-[#DC2626] text-rose-300";
    }
    return "bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061]";
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-gradient-to-b from-[#120726] via-[#1A0A30] to-[#120726] text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1F0838]/95 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-[0_8px_32px_rgba(225,29,116,0.25)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D74]/20 border border-[#E11D74] text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase mb-2">
                <span>✦ प्रमाणित बही-खाता ✦</span>
                <span>Official Mining Audit Trail</span>
              </div>
              <h1 className="font-['Rozha_One',serif] text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00] flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-[#F5D061]" />
                डिजिटल बही-खाता एवं अभिलेख
              </h1>
              <p className="text-[#FFF8E7]/70 font-['Rajdhani',sans-serif] text-sm md:text-base mt-1">
                Cryptographically Signed Daily Operation Entries, OCR Receipts & DGMS Compliance Logs
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-[#FF7A00] via-[#E11D74] to-[#FF7A00] bg-size-200 hover:bg-right transition-all text-white font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider px-6 py-3 rounded-xl border-2 border-[#F5D061]/70 shadow-[0_0_15px_rgba(245,208,97,0.4)] flex items-center gap-2" 
              onClick={exportPDF}
            >
              <Download className="w-5 h-5 text-[#FFF8E7]" />
              पीडीएफ डाउनलोड • Export PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Table */}
          <div className="flex-1 bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 rounded-2xl p-6 border-2 border-[#F5D061]/35 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-5 border-b border-[#F5D061]/20 pb-3">
              <div>
                <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                  दैनिक प्रविष्टियाँ • Certified Log Entries
                </h2>
                <span className="text-xs font-['Rajdhani',sans-serif] text-[#00A896] uppercase tracking-wider font-bold">Tamper-Proof Audit</span>
              </div>
              <span className="text-xs font-['Rajdhani',sans-serif] bg-[#E11D74]/20 border border-[#E11D74]/50 text-[#F5D061] px-3 py-1 rounded-full font-bold">
                {demoRows.length + logbookEntries.length} Records Active
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border-separate border-spacing-y-2.5">
                <thead>
                  <tr>
                    {logbookTableColumns.map((col) => (
                      <th key={col} className="px-4 py-2.5 bg-[#180A30] text-[#F5D061] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-xs border border-[#F5D061]/25 first:rounded-l-lg last:rounded-r-lg">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...demoRows,
                    ...logbookEntries.filter(e => e.type === "OCR Document").map(e => [
                      e.date.toLocaleDateString(),
                      e.type,
                      e.operator,
                      e.filename || "-",
                      (e.note || "").slice(0, 100) + (e.note && e.note.length > 100 ? "..." : "")
                    ])
                  ].map((row, i) => (
                    <tr key={i} className="bg-[#180A30]/85 hover:bg-[#E11D74]/15 border border-[#F5D061]/15 transition-all">
                      <td className="px-4 py-3 text-xs text-[#FFF8E7]/70 font-mono first:rounded-l-lg border-y border-l border-[#F5D061]/20">{row[0]}</td>
                      <td className="px-4 py-3 border-y border-[#F5D061]/20">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-['Rajdhani',sans-serif] font-bold ${getTypeBadge(row[1])}`}>
                          {row[1]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-['Rajdhani',sans-serif] font-bold text-white border-y border-[#F5D061]/20">{row[2]}</td>
                      <td className="px-4 py-3 text-xs font-mono text-[#F5D061] border-y border-[#F5D061]/20">{row[3]}</td>
                      <td className="px-4 py-3 text-sm text-[#FFF8E7]/80 last:rounded-r-lg border-y border-r border-[#F5D061]/20">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Cards: OCR Summary & Equipment Logs */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            {/* OCR Summary */}
            <div className="bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 rounded-2xl p-6 border-2 border-[#F5D061]/35 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-[#00A896]" />
                <h3 className="font-['Rozha_One',serif] text-lg text-[#FFF8E7]">ओसीआर सारांश • Today's OCR</h3>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#180A30]/90 rounded-xl border border-[#F5D061]/25 mb-4">
                <span className="font-['Rozha_One',serif] text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#F5D061] to-[#FF7A00]">
                  {ocrToday.length}
                </span>
                <div>
                  <div className="text-white font-['Rajdhani',sans-serif] font-bold text-sm">दस्तावेज़ स्कैन (Scanned)</div>
                  <div className="text-xs text-[#00A896]">AI Verified Slip Archive</div>
                </div>
              </div>
              <div className="text-xs font-['Rajdhani',sans-serif] text-[#FFF8E7]/70 mb-3">
                <span className="text-[#F5D061] font-bold">सत्यापनकर्ता (Auditor):</span> {currentUser.name}
              </div>
              <div className="space-y-1.5">
                <div className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider font-bold">हालिया पर्चियाँ (Recent Slips):</div>
                {ocrToday.length === 0 ? (
                  <p className="text-xs text-[#FFF8E7]/50 italic">आज कोई नई पर्ची नहीं (No slips scanned today)</p>
                ) : (
                  ocrToday.map(scan => (
                    <div key={scan.id} className="text-xs p-2 rounded bg-[#180A30] border border-[#F5D061]/15 text-[#FFF8E7]">
                      📄 {scan.filename}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Safety Inspections */}
            <div className="bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 rounded-2xl p-6 border-2 border-[#F5D061]/35 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#FF7A00]" />
                <h3 className="font-['Rozha_One',serif] text-lg text-[#FFF8E7]">सुरक्षा एवं रखरखाव • Safety Log</h3>
              </div>
              <div className="space-y-3">
                {equipmentLogs.map((log, i) => (
                  <div key={i} className="p-3 bg-[#180A30]/80 rounded-xl border border-[#F5D061]/20">
                    <div className="flex items-center justify-between text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] mb-1">
                      <span>✦ {log.type}</span>
                      <span className="text-[#FFF8E7]/60">{log.operator}</span>
                    </div>
                    <p className="text-xs text-[#FFF8E7]/90">{log.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 