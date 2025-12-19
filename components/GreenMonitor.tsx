import React, { useEffect, useState } from 'react';
import { Leaf, Wind, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS } from '../constants.ts';

const GreenMonitor: React.FC = () => {
  const [treeCount, setTreeCount] = useState(0);

  const data = Array.from({ length: 12 }, (_, i) => ({
    month: `Thg ${i + 1}`,
    standard: Math.floor(Math.random() * (1000 - 800 + 1) + 800),
    smartE: Math.floor(Math.random() * (500 - 400 + 1) + 400),
  }));

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
       <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Giám sát Năng lượng</h2>
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>Energy Surveillance & Sustainability Tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <h3 className="text-lg font-bold mb-6 flex items-center" style={{ color: COLORS.textPrimary }}>
            <Zap className="mr-2" size={20} color={COLORS.accentGold} />
            So sánh Tiêu thụ Năng lượng (kWh)
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid stroke="#233554" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke={COLORS.textSecondary} />
                <YAxis stroke={COLORS.textSecondary} />
                <Tooltip contentStyle={{ backgroundColor: COLORS.bg, borderColor: '#233554' }} />
                <Area type="monotone" dataKey="standard" name="Kho thường" stroke={COLORS.textSecondary} fill="#8892B0" fillOpacity={0.1} />
                <Area type="monotone" dataKey="smartE" name="SmartE System" stroke={COLORS.accentGreen} strokeWidth={3} fill={COLORS.accentGreen} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
            <div className="rounded-lg p-6 shadow-lg border border-slate-800 h-full flex flex-col justify-center items-center text-center" style={{ backgroundColor: COLORS.surface }}>
                <Leaf size={48} color={COLORS.accentGreen} className="mb-4" />
                <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>Cây xanh tương đương</h3>
                <div className="text-5xl font-bold font-mono" style={{ color: COLORS.accentGreen }}>{treeCount}</div>
            </div>
            <div className="rounded-lg p-6 shadow-lg border border-slate-800 h-full flex flex-col justify-center items-center text-center" style={{ backgroundColor: COLORS.surface }}>
                <Wind size={48} color={COLORS.accentBlue} className="mb-4" />
                <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>CO2 Cắt giảm</h3>
                <div className="text-4xl font-bold font-mono" style={{ color: COLORS.accentBlue }}>{(treeCount * 20).toLocaleString()} <span className="text-lg">kg</span></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GreenMonitor;