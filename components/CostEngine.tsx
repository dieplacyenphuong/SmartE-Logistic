import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, CheckCircle, Bot, Users, Layers, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS, formatCurrency, formatNumber, TIER_INFO } from '../constants';
import { CostInput, CalculationResult } from '../types';

const CostEngine: React.FC = () => {
  const [inputs, setInputs] = useState<CostInput>({
    staffCount: 10,
    avgSalary: 8000000,
    warehouseArea: 100, // Default range start
    damageRate: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleInputChange = (field: keyof CostInput, value: number) => {
    // Validation: No negative numbers
    if (value < 0) return;
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    setIsLoading(true);
    setResult(null);

    // Simulate AI Calculation delay
    setTimeout(() => {
      const { staffCount, avgSalary, warehouseArea, damageRate } = inputs;

      // Old Cost Logic
      const laborOld = staffCount * avgSalary;
      // Assumption: Stored goods value ~ 500,000 VND/m2
      const hiddenOld = warehouseArea * 500000 * (damageRate / 100); 
      const rent = warehouseArea * 100000;
      const totalOld = laborOld + hiddenOld + rent;

      // New Cost Logic (SmartE)
      const laborNew = laborOld * 0.7; // 30% productivity increase -> 70% cost remains
      const hiddenNew = hiddenOld * 0.1; // 90% reduction in damage
      const softwareFee = 5000000;
      const totalNew = laborNew + hiddenNew + rent + softwareFee;

      const savings = totalOld - totalNew;
      const roiMonth = savings > 0 ? 100000000 / savings : 0; // 100M investment

      // Tier Logic
      let tier: CalculationResult['tier'] = 'TIER_2';
      if (warehouseArea > 5000) tier = 'TIER_1';
      else if (warehouseArea >= 1000) tier = 'TIER_1_5';

      setResult({
        oldCost: { labor: laborOld, hidden: hiddenOld, rent, total: totalOld },
        newCost: { labor: laborNew, hidden: hiddenNew, rent, softwareFee, total: totalNew },
        savings,
        roiMonth,
        tier
      });
      setIsLoading(false);
    }, 1000);
  };

  const chartData = result ? [
    {
      name: 'Chi phí Cũ',
      Labor: result.oldCost.labor,
      Hidden: result.oldCost.hidden,
      Rent: result.oldCost.rent,
      Software: 0
    },
    {
      name: 'Chi phí Mới',
      Labor: result.newCost.labor,
      Hidden: result.newCost.hidden,
      Rent: result.newCost.rent,
      Software: result.newCost.softwareFee
    }
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.accentGold }}>Cost Engine (TCO Optimization)</h2>
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>AI-Powered Cost Analysis & ROI Prediction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INPUT FORM */}
        <div className="lg:col-span-4 rounded-lg p-6 shadow-lg border border-slate-800 h-fit" style={{ backgroundColor: COLORS.surface }}>
          <h3 className="text-lg font-bold mb-6 flex items-center text-white">
            <Calculator className="mr-2" size={20} />
            Tham số Đầu vào
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Nhân sự kho (Người)</label>
              <input 
                type="number" 
                value={inputs.staffCount}
                onChange={(e) => handleInputChange('staffCount', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Lương trung bình (VNĐ)</label>
              <input 
                type="number" 
                value={inputs.avgSalary}
                onChange={(e) => handleInputChange('avgSalary', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none font-mono"
              />
              <div className="text-xs text-slate-500 mt-1 text-right">{formatCurrency(inputs.avgSalary)}</div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-medium text-slate-400">Diện tích kho (m2)</label>
                <span className="text-xs font-bold text-blue-400">{formatNumber(inputs.warehouseArea)} m2</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="50"
                value={inputs.warehouseArea}
                onChange={(e) => handleInputChange('warehouseArea', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>100</span>
                <span>5,000</span>
                <span>10,000</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Tỷ lệ hàng hỏng/tháng (%)</label>
              <input 
                type="number" 
                value={inputs.damageRate}
                onChange={(e) => handleInputChange('damageRate', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>

            <button 
              onClick={calculate}
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex justify-center items-center shadow-lg shadow-blue-900/50 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>PHÂN TÍCH <ArrowRight className="ml-2" size={16} /></>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Default State - Waiting */}
          {!result && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-lg p-10 text-slate-600">
               <Layers size={64} className="mb-4 opacity-50" />
               <p>Nhập dữ liệu và bấm "Phân tích" để xem báo cáo TCO</p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading && (
             <div className="h-full flex flex-col items-center justify-center border border-slate-800 rounded-lg p-10 bg-[#112240]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-400 animate-pulse">AI đang tính toán mô hình tối ưu...</p>
             </div>
          )}

          {/* Result Content */}
          {result && (
            <>
              {/* Recommendation Banner */}
              <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 flex items-start space-x-4 animate-slide-in-up">
                <div className="p-3 bg-blue-500/20 rounded-full shrink-0">
                  {result.tier === 'TIER_1' ? <Bot size={24} className="text-blue-400"/> : 
                   result.tier === 'TIER_1_5' ? <Layers size={24} className="text-blue-400"/> : 
                   <Users size={24} className="text-blue-400"/>}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Phát hiện quy mô {result.tier === 'TIER_1' ? 'Lớn' : result.tier === 'TIER_1_5' ? 'Vừa' : 'Nhỏ'}.
                    Đề xuất giải pháp <span className="text-blue-400">{TIER_INFO[result.tier].name}</span>
                  </h4>
                  <p className="text-sm text-slate-400">
                    Công nghệ gợi ý: <span className="text-white font-medium">{TIER_INFO[result.tier].tech}</span>. 
                    Giải pháp này giúp tối ưu ROI dựa trên diện tích {formatNumber(inputs.warehouseArea)}m2.
                  </p>
                </div>
              </div>

              {/* Chart & Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart */}
                <div className="rounded-lg p-6 shadow-lg border border-slate-800 bg-[#112240] h-[400px]">
                  <h4 className="text-sm font-bold text-slate-400 mb-4 flex items-center">
                    Cấu trúc Chi phí (VNĐ/Tháng)
                    <div className="group relative ml-2">
                       <Info size={14} className="cursor-pointer hover:text-white" />
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-xs text-slate-300 rounded shadow-xl hidden group-hover:block z-10 border border-slate-700">
                         Chi phí ẩn (Hàng hỏng/Hủy) là 'tảng băng chìm' lớn nhất. SmartE giúp bạn loại bỏ 90% chi phí này nhờ thuật toán FEFO.
                       </div>
                    </div>
                  </h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                      <CartesianGrid stroke="#233554" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke={COLORS.textSecondary} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                      <YAxis stroke={COLORS.textSecondary} tickFormatter={(val) => `${val/1000000}M`} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: COLORS.bg, borderColor: '#233554', color: COLORS.textPrimary }}
                      />
                      <Legend />
                      <Bar dataKey="Labor" stackId="a" fill="#3B82F6" name="Nhân sự" />
                      <Bar dataKey="Hidden" stackId="a" fill="#EF4444" name="Hàng hỏng (Ẩn)" />
                      <Bar dataKey="Rent" stackId="a" fill="#64748B" name="Thuê kho" />
                      <Bar dataKey="Software" stackId="a" fill="#10B981" name="Phí SmartE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* KPI Result Cards */}
                <div className="space-y-4">
                  
                  {/* Saving Card */}
                  <div className="bg-[#112240] rounded-lg p-5 border border-green-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full -mr-4 -mt-4"></div>
                    <h5 className="text-sm text-slate-400 uppercase tracking-wider">Tiết kiệm hàng tháng</h5>
                    <div className="text-3xl font-bold font-mono text-green-400 mt-2">
                      {formatCurrency(result.savings)}
                    </div>
                    <div className="mt-2 text-xs text-green-600 flex items-center">
                       <CheckCircle size={12} className="mr-1" />
                       Giảm {((result.savings / result.oldCost.total) * 100).toFixed(1)}% so với chi phí cũ
                    </div>
                  </div>

                  {/* ROI Card */}
                  <div className="bg-[#112240] rounded-lg p-5 border border-yellow-500/30">
                     <h5 className="text-sm text-slate-400 uppercase tracking-wider">Thời gian hoàn vốn (ROI)</h5>
                     <div className="text-3xl font-bold font-mono text-yellow-400 mt-2">
                      {result.roiMonth.toFixed(1)} Tháng
                    </div>
                     <p className="text-xs text-slate-500 mt-2">
                        Giả định vốn đầu tư ban đầu: 100,000,000 đ
                     </p>
                  </div>
                  
                  {/* Breakdown List */}
                  <div className="bg-[#112240] rounded-lg p-5 border border-slate-800">
                    <h5 className="text-sm text-slate-400 mb-3 border-b border-slate-700 pb-2">Chi tiết hiệu quả</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-slate-500">Năng suất nhân sự</span>
                        <span className="text-green-400">+30%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-500">Giảm hàng hỏng (FEFO)</span>
                        <span className="text-green-400">-90%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-500">Tổng chi phí mới</span>
                        <span className="text-white font-mono">{formatCurrency(result.newCost.total)}</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CostEngine;