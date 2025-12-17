import React from 'react';
import { PackageCheck, Clock, Zap, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '../constants';

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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Dashboard Overview</h2>
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>Real-time Logistics Monitoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
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

        {/* Card 2 */}
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

        {/* Card 3 */}
        <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-full bg-green-500/10">
              <Zap size={24} style={{ color: COLORS.accentGreen }} />
            </div>
          </div>
          <h3 className="text-sm font-medium" style={{ color: COLORS.textSecondary }}>Điện năng tiêu thụ</h3>
          <p className="text-2xl font-bold font-mono mt-1" style={{ color: COLORS.accentGreen }}>450 kWh</p>
        </div>

        {/* Card 4 */}
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

      {/* Main Chart */}
      <div className="rounded-lg p-6 shadow-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
        <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.textPrimary }}>Lưu lượng Hàng hóa (Traffic Flow)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid stroke="#233554" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour" 
                stroke={COLORS.textSecondary} 
                tick={{ fill: COLORS.textSecondary, fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#233554' }}
              />
              <YAxis 
                stroke={COLORS.textSecondary} 
                tick={{ fill: COLORS.textSecondary, fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#233554' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: COLORS.bg, borderColor: '#233554', color: COLORS.textPrimary }}
                itemStyle={{ color: COLORS.textPrimary }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="inbound" name="Nhập kho (Inbound)" fill={COLORS.accentBlue} radius={[4, 4, 0, 0]} barSize={30} />
              <Line type="monotone" dataKey="outbound" name="Xuất kho (Outbound)" stroke={COLORS.accentGreen} strokeWidth={3} dot={{ r: 4, fill: COLORS.bg, strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Footer message specific to dashboard */}
      <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start space-x-3">
        <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-red-500 text-sm">Cảnh báo FEFO</h4>
          <p className="text-slate-400 text-sm mt-1">
            Lô hàng <span className="font-mono text-white">#VNM-milk-001</span> tại vị trí A-05 chỉ còn 15 ngày sử dụng. Hệ thống đã khóa lệnh nhập mới.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;