import React, { useEffect, useState, useRef } from 'react';
import { qrDatabase } from '../../../../Module/qrDatabase';
import { CoalBatchData } from '../../../../Module/qrService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { qrService } from '../../../../Module/qrService';

interface ProductionStats {
  totalBatches: number;
  totalWeight: number;
  qualityDistribution: Record<string, number>;
  locationDistribution: Record<string, number>;
  averageWeight: number;
}

interface TimeSeriesData {
  date: string;
  weight: number;
}

export const ProductionPage = (): JSX.Element => {
  const [stats, setStats] = useState<ProductionStats | null>(null);
  const [recentBatches, setRecentBatches] = useState<CoalBatchData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const volumeChartRef = useRef<HTMLDivElement>(null);
  const qualityChartRef = useRef<HTMLDivElement>(null);
  const locationChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [batchStats, batches] = await Promise.all([
          qrDatabase.getBatchStats(),
          qrDatabase.getRecentBatches(100) // Fetch more for better time series
        ]);
        
        setStats(batchStats);
        setRecentBatches(batches.slice(0, 10)); // Show latest 10 in table
        
        // Process data for time series chart (last 7 days)
        const seriesData: Record<string, number> = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            seriesData[d.toISOString().split('T')[0]] = 0;
        }

        batches.forEach(batch => {
          const batchDate = batch.dispatchTime.toISOString().split('T')[0];
          if (seriesData[batchDate] !== undefined) {
            seriesData[batchDate] += batch.weight;
          }
        });

        setTimeSeriesData(Object.entries(seriesData).map(([date, weight]) => ({ date, weight })));

      } catch (error) {
        console.error("Failed to fetch production data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExportPdf = async () => {
    if (!stats || !recentBatches.length) {
      alert("No data available to export.");
      return;
    }
    try {
      await qrService.generateProductionReport(stats, recentBatches, {
        volumeChart: volumeChartRef.current,
        qualityChart: qualityChartRef.current,
        locationChart: locationChartRef.current,
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF report.");
    }
  };

  const qualityPieData = stats ? Object.entries(stats.qualityDistribution).map(([name, value]) => ({ name, value })) : [];
  const locationPieData = stats ? Object.entries(stats.locationDistribution).map(([name, value]) => ({ name, value })) : [];
  
  const COLORS = ['#FF7A00', '#E11D74', '#F5D061', '#00A896', '#10B981'];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#FFF8E7" className="font-['Rozha_One',serif]">{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={3} fill="#F5D061" stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#F5D061" className="font-['Rajdhani',sans-serif] font-bold text-xs">{`${value} Batches`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#FFF8E7" opacity={0.7} className="text-[11px]">
          {`(Rate ${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-transparent text-[#FFF8E7] flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-[#FF7A00] border-r-[#E11D74] border-b-[#F5D061] animate-spin mb-4"></div>
        <p className="font-['Rozha_One',serif] text-xl text-[#F5D061]">लोड हो रहा है • Loading Production Data...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-8 bg-transparent text-[#FFF8E7] font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#260E45]/90 via-[#1E0C38]/90 to-[#140826]/90 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
          <div>
            <div className="truck-art-badge text-xs mb-1.5">
              <span>📊 उत्पादन विश्लेषण • REAL-TIME EXTRACTION</span>
            </div>
            <h1 className="font-['Rozha_One',serif] text-3xl sm:text-4xl text-[#FFF8E7] tracking-wide">
              Production <span className="desi-text-gold">Intelligence</span>
            </h1>
            <p className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00] uppercase tracking-wider mt-0.5">
              खदान उत्पादन सांख्यिकी एवं गुणवत्ता रिपोर्ट
            </p>
          </div>

          <Button onClick={handleExportPdf} className="desi-btn-primary px-6 py-2.5 rounded-xl font-['Rajdhani',sans-serif] font-bold text-sm tracking-wider">
            📄 निर्यात रिपोर्ट • Export PDF
          </Button>
        </div>
        
        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 to-[#1A0B36]/90 border-2 border-[#F5D061]/40 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#F5D061]">कुल उत्पादन • TOTAL YIELD</span>
                <p className="font-['Rozha_One',serif] text-3xl text-[#FFF8E7] mt-1.5">{stats?.totalWeight.toLocaleString() || 0} <span className="text-sm font-sans text-[#FF7A00]">tons</span></p>
                <div className="text-[11px] text-emerald-400 mt-1 font-['Rajdhani',sans-serif] font-bold">✦ All Operational Shafts</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 to-[#1A0B36]/90 border-2 border-[#00A896]/50 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#05D5BE]">कुल बैच • TOTAL BATCHES</span>
                <p className="font-['Rozha_One',serif] text-3xl text-[#FFF8E7] mt-1.5">{stats?.totalBatches.toLocaleString() || 0} <span className="text-sm font-sans text-[#05D5BE]">units</span></p>
                <div className="text-[11px] text-[#05D5BE] mt-1 font-['Rajdhani',sans-serif] font-bold">✦ Cryptographically Signed</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 to-[#1A0B36]/90 border-2 border-[#E11D74]/50 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#FF85BA]">औसत भार • AVG BATCH WEIGHT</span>
                <p className="font-['Rozha_One',serif] text-3xl text-[#FFF8E7] mt-1.5">{stats?.averageWeight.toFixed(2) || 0} <span className="text-sm font-sans text-[#E11D74]">tons</span></p>
                <div className="text-[11px] text-[#FF85BA] mt-1 font-['Rajdhani',sans-serif] font-bold">✦ Per Dumper Dispatch</div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#260E45]/90 to-[#1A0B36]/90 border-2 border-[#FF7A00]/50 shadow-lg relative overflow-hidden">
                <span className="text-[10px] font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-[#FFA047]">उच्च गुणवत्ता • PREMIUM GRADE</span>
                <p className="font-['Rozha_One',serif] text-3xl text-[#F5D061] mt-1.5">
                    {stats && stats.totalBatches > 0 ? 
                        ((stats.qualityDistribution['Premium'] || 0) / stats.totalBatches * 100).toFixed(1) : 0
                    }%
                </p>
                <div className="text-[11px] text-amber-400 mt-1 font-['Rajdhani',sans-serif] font-bold">✦ Grade-A Anthracite Standard</div>
            </div>
        </div>

        {/* Production Volume Chart */}
        <div ref={volumeChartRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#F5D061]/25">
              <div>
                <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                  उत्पादन मात्रा • 7-Day Extraction Volume
                </h2>
                <p className="text-xs font-['Rajdhani',sans-serif] text-[#FF7A00] uppercase tracking-wider">विगत सात दिनों का दैनिक उत्पादन ग्राफ</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FF7A00]/20 border border-[#F5D061]/50 text-[#F5D061] text-xs font-['Rajdhani',sans-serif] font-bold">
                TONS PER DAY
              </span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3F186E" opacity={0.6} />
                    <XAxis dataKey="date" stroke="#F5D061" fontSize={11} />
                    <YAxis stroke="#F5D061" fontSize={11} label={{ value: 'Tons', angle: -90, position: 'insideLeft', fill: '#F5D061' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#180A30', borderColor: '#F5D061', color: '#FFF8E7', borderRadius: '12px' }} />
                    <Legend />
                    <Bar dataKey="weight" fill="url(#goldGradient)" name="Production Weight (tons)" radius={[6, 6, 0, 0]} />
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF7A00" />
                        <stop offset="100%" stopColor="#E11D74" />
                      </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Quality and Location Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div ref={qualityChartRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
            <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-1">
              गुणवत्ता अनुसार विभाजन • Quality Breakdown
            </h2>
            <p className="text-xs font-['Rajdhani',sans-serif] text-[#05D5BE] uppercase tracking-wider mb-4">Grade Classification Ratio</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={qualityPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                >
                  {qualityPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div ref={locationChartRef} className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
            <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7] mb-1">
              खदान स्थल अनुसार • Production by Mine Shaft
            </h2>
            <p className="text-xs font-['Rajdhani',sans-serif] text-[#FF7A00] uppercase tracking-wider mb-4">Location Yield Distribution</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationPieData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#3F186E" opacity={0.6} />
                    <XAxis type="number" stroke="#F5D061" fontSize={11} />
                    <YAxis type="category" dataKey="name" stroke="#F5D061" width={120} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#180A30', borderColor: '#F5D061', color: '#FFF8E7', borderRadius: '12px' }} />
                    <Bar dataKey="value" fill="#00A896" name="Batches" radius={[0, 6, 6, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Batches Table with Royal Styling */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#260E45]/90 via-[#1E0C38]/90 to-[#120726]/90 border-2 border-[#F5D061]/40 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#F5D061]/25">
              <div>
                <h2 className="font-['Rozha_One',serif] text-xl text-[#FFF8E7]">
                  हाल ही में प्रेषित बैच • Recent Dispatched Batches
                </h2>
                <p className="text-xs font-['Rajdhani',sans-serif] text-[#F5D061] uppercase tracking-wider">Live QR Manifest Log</p>
              </div>
              <span className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00]">
                कुल प्रविष्टियां: {recentBatches.length}
              </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#F5D061]/30 bg-[#15092A]">
                            <th className="p-3 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">बैच पहचान • Batch ID</th>
                            <th className="p-3 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">भार • Weight (tons)</th>
                            <th className="p-3 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">गुणवत्ता • Quality</th>
                            <th className="p-3 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">स्थान • Location</th>
                            <th className="p-3 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">प्रेषण समय • Dispatch Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBatches.map(batch => (
                            <tr key={batch.id} className="border-b border-[#F5D061]/15 hover:bg-[#E11D74]/15 transition-colors">
                                <td className="p-3 text-xs text-[#FFF8E7] font-mono font-bold text-[#F5D061]">{batch.id.slice(-12)}</td>
                                <td className="p-3 text-sm text-white font-semibold">{batch.weight.toLocaleString()}</td>
                                <td className="p-3 text-sm">
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-['Rajdhani',sans-serif] ${
                                    batch.quality === 'Premium' ? 'bg-emerald-950/70 border border-emerald-500 text-emerald-300' :
                                    batch.quality === 'Standard' ? 'bg-amber-950/70 border border-amber-500 text-amber-300' :
                                    'bg-red-950/70 border border-red-500 text-red-300'
                                  }`}>
                                    {batch.quality}
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-[#FFF8E7]/80">{batch.mineLocation}</td>
                                <td className="p-3 text-xs text-[#FFF8E7]/60 font-mono">{batch.dispatchTime.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}; 