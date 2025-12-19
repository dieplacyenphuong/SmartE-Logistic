import React, { useState } from 'react';
import { Calculator, ArrowRight, Bot, Users, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS, formatCurrency, formatNumber, TIER_INFO } from '../constants.ts';
import { CostInput, CalculationResult } from '../types.ts';

const CostEngine: React.FC = () => {
  const [inputs, setInputs] = useState<CostInput>({
    staffCount: 10,
    avgSalary: 8000000,
    warehouseArea: 100,
    damageRate: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { staffCount, avgSalary, warehouseArea, damageRate } = inputs;
      const laborOld = staffCount * avgSalary;
      const hiddenOld = warehouseArea * 500000 * (damageRate / 100); 
      const rent = warehouseArea * 100000;
      const totalOld = laborOld + hiddenOld + rent;
      const laborNew = laborOld * 0.7;
      const hiddenNew = hiddenOld * 0.1;
      const softwareFee = 5000000;
      const totalNew = laborNew + hiddenNew + rent + softwareFee;
      const savings = totalOld - totalNew;
      const roiMonth = savings > 0 ? 100000000 / savings : 0;
      let tier: CalculationResult['tier'] = warehouseArea > 5000 ? 'TIER_1' : warehouseArea >= 1000 ? 'TIER_1_5' : 'TIER_2';

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
    { name: 'Cũ', Labor: result.oldCost.labor, Hidden: result.oldCost.hidden, Rent: result.oldCost.rent },
    { name: 'Mới', Labor: result.newCost.labor, Hidden: result.newCost.hidden, Rent: result.newCost.rent, Software: result.newCost.softwareFee }
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <h2 className="text-2xl font-bold" style={{ color: COLORS.accentGold }}>Cost Engine (TCO Optimization)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-lg p-6 border border-slate-800 bg-[#112240]">
          <h3 className="text-lg font-bold mb-6 flex items-center text-white"><Calculator className="mr-2" size={20} /> Tham số</h3>
          <div className="space-y-5">
            <input type="number" value={inputs.staffCount} onChange={(e) => setInputs({...inputs, staffCount: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" placeholder="Nhân sự" />
            <input type="number" value={inputs.avgSalary} onChange={(e) => setInputs({...inputs, avgSalary: Number(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" placeholder="Lương" />
            <input type="range" min="100" max="10000" value={inputs.warehouseArea} onChange={(e) => setInputs({...inputs, warehouseArea: Number(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
            <p className="text-xs text-slate-400">Diện tích: {inputs.warehouseArea}m2</p>
            <button onClick={calculate} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500">PHÂN TÍCH</button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {result && (
            <div className="space-y-6">
              <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 flex items-center space-x-4">
                <Bot size={24} className="text-blue-400" />
                <div>
                  <h4 className="font-bold text-white">Đề xuất: {TIER_INFO[result.tier].name}</h4>
                  <p className="text-xs text-slate-400">{TIER_INFO[result.tier].tech}</p>
                </div>
              </div>
              <div className="h-[300px] bg-[#112240] rounded-lg p-4 border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid stroke="#233554" vertical={false} />
                    <XAxis dataKey="name" stroke="#8892B0" />
                    <YAxis stroke="#8892B0" />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.bg }} />
                    <Legend />
                    <Bar dataKey="Labor" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Hidden" stackId="a" fill="#EF4444" />
                    <Bar dataKey="Software" stackId="a" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostEngine;