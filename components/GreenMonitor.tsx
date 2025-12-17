import React, { useEffect, useState } from 'react';
import { Leaf, Wind, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS } from '../constants';

const GreenMonitor: React.FC = () => {
  const [treeCount, setTreeCount] = useState(0);

  // Generate random data for chart
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: `Thg ${i + 1}`,
    standard: Math.floor(Math.random() * (1000 - 800 + 1) + 800), // 800-1000
    smartE: Math.floor(Math.random() * (500 - 400 + 1) + 400),   // 400-500
  }));

  // Tree counting animation
  useEffect(() => {
    let current = 0;
    const end = 50;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      current += 1;
      setTreeCount(current);
      if (current === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
       {/* Header - Aligned like DashboardHome */}
       <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Giám sát Năng lượng</h2>
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>Energy Surveillance & Sustainability Tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Chart */}
        <div className="lg:col-span-2 rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <h3 className="text-lg font-bold mb-6 flex items-center" style={{ color: COLORS.textPrimary }}>
            <Zap className="mr-2" size={20} color={COLORS.accentGold} />
            So sánh Tiêu thụ Năng lượng (kWh)
          </h3>
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.textSecondary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.textSecondary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accentGreen} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.accentGreen} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#233554" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke={COLORS.textSecondary} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke={COLORS.textSecondary} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: COLORS.bg, borderColor: '#233554', color: COLORS.textPrimary }}
                />
                <Area type="monotone" dataKey="standard" name="Kho thường" stroke={COLORS.textSecondary} fillOpacity={1} fill="url(#colorStandard)" />
                <Area type="monotone" dataKey="smartE" name="SmartE System" stroke={COLORS.accentGreen} strokeWidth={3} fillOpacity={1} fill="url(#colorSmart)" />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Annotation Overlay */}
            <div className="absolute top-1/4 right-1/4 bg-green-500/20 backdrop-blur-sm border border-green-500/50 px-3 py-2 rounded-lg text-xs md:text-sm font-bold text-green-300 animate-bounce">
              Tiết kiệm ~45%
            </div>
          </div>
        </div>

        {/* Right Col: Impact Counters */}
        <div className="space-y-6">
            <div className="rounded-lg p-6 shadow-lg border border-slate-800 h-full flex flex-col justify-center items-center text-center" style={{ backgroundColor: COLORS.surface }}>
                <div className="p-4 bg-green-900/20 rounded-full mb-4">
                    <Leaf size={48} color={COLORS.accentGreen} />
                </div>
                <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>Cây xanh tương đương</h3>
                <div className="text-5xl font-bold font-mono mb-2" style={{ color: COLORS.accentGreen }}>
                    {treeCount}
                </div>
                <p className="text-xs text-slate-500">Cây trưởng thành hấp thụ / năm</p>
            </div>
            
            <div className="rounded-lg p-6 shadow-lg border border-slate-800 h-full flex flex-col justify-center items-center text-center" style={{ backgroundColor: COLORS.surface }}>
                 <div className="p-4 bg-blue-900/20 rounded-full mb-4">
                    <Wind size={48} color={COLORS.accentBlue} />
                </div>
                <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>CO2 Cắt giảm</h3>
                <div className="text-5xl font-bold font-mono mb-2" style={{ color: COLORS.accentBlue }}>
                    {(treeCount * 20).toLocaleString()} <span className="text-lg">kg</span>
                </div>
                 <p className="text-xs text-slate-500">Dựa trên hiệu suất tiết kiệm điện</p>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-400 mb-2">Công thức quy đổi</h4>
            <ul className="text-sm space-y-1 text-slate-500">
                <li>• 1 kWh tiết kiệm ≈ 0.7 kg CO2 cắt giảm</li>
                <li>• 20 kg CO2 ≈ 1 Cây xanh trưởng thành hấp thụ/năm</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default GreenMonitor;