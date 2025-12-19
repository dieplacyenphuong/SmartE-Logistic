import React from 'react';
import { PackageCheck, Clock, Zap, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '../constants.ts';

const data = [
  { hour: '00:00', inbound: 40, outbound: 24 },
  { hour: '04:00', inbound: 30, outbound: 13 },
  { hour: '08:00', inbound: 98, outbound: 120 },
  { hour: '12:00', inbound: 150, outbound: 180 },
  { hour: '16:00', inbound: 120, outbound: 160 },
  { hour: '20:00', inbound: 80, outbound: 90 },
  { hour: '23:00', inbound: 50, outbound: 40 },
];

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Dashboard Overview</h2>
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>Real-time Logistics Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-full bg-blue-500/10">
              <PackageCheck size={24} style={{ color: COLORS.accentBlue }} />
            </div>
            <span className="flex items-center text-xs px-2 py-1 rounded bg-green-500/10" style={{ color: COLORS.accentGreen }}>
              <TrendingUp size={14} className="mr-1" /> 5%
            </span>
          </div>
          <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Tồn kho thực</h3>
          <p className="text-2xl font-bold font-mono mt-1" style={{ color: COLORS.textPrimary }}>15,420</p>
        </div>

        <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-full bg-red-500/10">
              <Clock size={24} style={{ color: COLORS.accentRed }} />
            </div>
            <span className="flex items-center text-xs px-2 py-1 rounded bg-red-500/10" style={{ color: COLORS.accentRed }}>
              <TrendingDown size={14} className="mr-1" /> 2%
            </span>
          </div>
          <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Đơn chờ xử lý</h3>
          <p className="text-2xl font-bold font-mono mt-1" style={{ color: COLORS.textPrimary }}>1,240</p>
        </div>

        <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-full bg-green-500/10">
              <Zap size={24} style={{ color: COLORS.accentGreen }} />
            </div>
          </div>
          <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Điện năng tiêu thụ</h3>
          <p className="text-2xl font-bold font-mono mt-1" style={{ color: COLORS.accentGreen }}>450 kWh</p>
        </div>

        <div className="rounded-lg p-6 shadow-lg border border-slate-800 relative overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
          <div className="absolute top-0 right-0 w-full h-1 bg-red-500 animate-pulse"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-full bg-red-500/10 animate-pulse">
              <AlertTriangle size={24} style={{ color: COLORS.accentRed }} />
            </div>
          </div>
          <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Cảnh báo FEFO</h3>
          <p className="text-2xl font-bold font-mono mt-1 text-red-500">12 Lô</p>
        </div>
      </div>

      <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
        <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.textPrimary }}>Lưu lượng Hàng hóa (Traffic Flow)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid stroke="#233554" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" stroke={COLORS.textSecondary} tick={{ fill: COLORS.textSecondary, fontSize: 12 }} />
              <YAxis stroke={COLORS.textSecondary} tick={{ fill: COLORS.textSecondary, fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: COLORS.bg, borderColor: '#233554', color: COLORS.textPrimary }} />
              <Legend />
              <Bar dataKey="inbound" name="Nhập kho (Inbound)" fill={COLORS.accentBlue} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="outbound" name="Xuất kho (Outbound)" stroke={COLORS.accentGreen} strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;