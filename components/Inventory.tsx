import React, { useState } from 'react';
import { Search, Filter, Printer, Edit, AlertCircle, CheckCircle, Clock, Map, X, Package, Save, Check } from 'lucide-react';
import { COLORS } from '../constants';
import { InventoryItem } from '../types';

const INITIAL_ITEMS: InventoryItem[] = [
  { sku: 'VNM-01', name: 'Sữa tươi 100% - Vinamilk', location: 'A-05-02', quantity: 450, expiryDate: '2025-03-25', status: 'DANGER' },
  { sku: 'VNM-02', name: 'Sữa chua nha đam', location: 'A-05-03', quantity: 200, expiryDate: '2025-04-10', status: 'WARNING' },
  { sku: 'THM-01', name: 'Sữa hạt TH True Nut', location: 'B-02-01', quantity: 1200, expiryDate: '2025-12-15', status: 'SAFE' },
  { sku: 'NES-01', name: 'Cà phê hòa tan Nescafe', location: 'C-01-05', quantity: 800, expiryDate: '2026-01-10', status: 'SAFE' },
  { sku: 'VNM-03', name: 'Sữa đặc Ông Thọ', location: 'A-02-12', quantity: 15, expiryDate: '2025-03-15', status: 'DANGER' },
  { sku: 'HLW-01', name: 'Bánh xốp Highlands', location: 'B-03-04', quantity: 50, expiryDate: '2025-05-20', status: 'WARNING' },
];

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'DANGER' | 'WARNING' | 'SAFE'>('ALL');
  const [showInboundModal, setShowInboundModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  // Form State for new inbound
  const [newInbound, setNewInbound] = useState({
    sku: 'VNM-01',
    quantity: 0,
    unit: 'Thùng',
    prodDate: '',
    expiryDate: '',
    location: 'A-02'
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveInbound = () => {
    // Simple logic to add or update item
    const existingIndex = items.findIndex(i => i.sku === newInbound.sku);
    
    // Determine status based on expiry
    const expDate = new Date(newInbound.expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const status = diffDays < 30 ? 'DANGER' : diffDays < 60 ? 'WARNING' : 'SAFE';

    if (existingIndex > -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + Number(newInbound.quantity),
        expiryDate: newInbound.expiryDate,
        status
      };
      setItems(updatedItems);
    } else {
      const newItem: InventoryItem = {
        sku: newInbound.sku,
        name: `Sản phẩm ${newInbound.sku}`, // Simulated name
        location: newInbound.location,
        quantity: Number(newInbound.quantity),
        expiryDate: newInbound.expiryDate,
        status
      };
      setItems([newItem, ...items]);
    }
    
    setShowInboundModal(false);
    // Reset form
    setNewInbound({ sku: 'VNM-01', quantity: 0, unit: 'Thùng', prodDate: '', expiryDate: '', location: 'A-02' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DANGER': return <AlertCircle size={16} className="text-red-500" />;
      case 'WARNING': return <Clock size={16} className="text-yellow-500" />;
      default: return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DANGER': return <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-bold">HẾT HẠN SỚM</span>;
      case 'WARNING': return <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold">CẦN LƯU Ý</span>;
      default: return <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold">AN TOÀN</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Inventory Management</h2>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>Quản trị hàng hóa & Quy trình FEFO</p>
        </div>
        <div className="flex space-x-3">
            <button 
                onClick={() => setShowBarcodeModal(true)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm flex items-center hover:bg-slate-700"
            >
                <Printer size={16} className="mr-2" /> In mã vạch
            </button>
            <button 
                onClick={() => setShowInboundModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center hover:bg-blue-500"
            >
                Nhập kho mới
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-lg border border-slate-800 flex flex-wrap gap-4 items-center" style={{ backgroundColor: COLORS.surface }}>
             <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                    type="text" 
                    placeholder="Tìm theo SKU hoặc Tên hàng..." 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex items-center space-x-2">
                <Filter size={16} className="text-slate-500" />
                <select 
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="DANGER">Sắp hết hạn (🔴)</option>
                    <option value="WARNING">Cần lưu ý (🟡)</option>
                    <option value="SAFE">An toàn (🟢)</option>
                </select>
             </div>
          </div>

          <div className="rounded-lg border border-slate-800 overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold">Mã SKU / Tên hàng</th>
                  <th className="px-6 py-4 font-bold">Vị trí</th>
                  <th className="px-6 py-4 font-bold">Tồn kho</th>
                  <th className="px-6 py-4 font-bold">Hạn sử dụng</th>
                  <th className="px-6 py-4 font-bold">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-bold text-white">{item.sku}</div>
                        <div className="text-xs text-slate-500">{item.name}</div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="flex items-center text-xs font-mono px-2 py-1 bg-slate-900 rounded border border-slate-700">
                            <Map size={12} className="mr-1 text-slate-400" /> {item.location}
                        </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-300">
                        {item.quantity}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 mb-1">
                            {getStatusIcon(item.status)}
                            <span className="font-mono">{item.expiryDate}</span>
                        </div>
                        {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            {item.status === 'DANGER' && (
                                <button className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 title='Tạo lệnh xuất gấp'">
                                    <AlertCircle size={16} />
                                </button>
                            )}
                            <button className="p-2 bg-slate-700 rounded hover:bg-slate-600">
                                <Edit size={16} />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Heatmap Simulation */}
        <div className="space-y-6">
            <div className="rounded-lg p-6 shadow-lg border border-slate-800 h-fit" style={{ backgroundColor: COLORS.surface }}>
                <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-slate-400">Sơ đồ nhiệt (Heatmap)</h3>
                <div className="space-y-4">
                    <p className="text-xs text-slate-500 italic">Cảnh báo FEFO: Các ô màu đỏ là khu vực có hàng sắp hết hạn.</p>
                    <div className="grid grid-cols-5 gap-2">
                        {Array.from({length: 25}).map((_, i) => {
                            let color = 'bg-slate-800';
                            if (i === 2) color = 'bg-red-500 animate-pulse'; // A-05
                            if (i === 7) color = 'bg-yellow-500'; // B-03
                            if (i === 15) color = 'bg-green-600'; 
                            return (
                                <div key={i} className={`h-8 rounded cursor-pointer border border-slate-700 transition-transform hover:scale-110 ${color}`}></div>
                            )
                        })}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                        <span>Lối vào</span>
                        <span>Lối ra</span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-6 shadow-lg border border-slate-800 bg-blue-900/10" style={{ borderStyle: 'dashed' }}>
                <h4 className="text-sm font-bold text-blue-400 mb-2">Gợi ý AI</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                    Hệ thống đề xuất luân chuyển 12 lô hàng tại Zone A sang Zone Outbound để ưu tiên xuất hàng trước ngày 25/03.
                </p>
            </div>
        </div>
      </div>

      {/* MODAL: NHẬP KHO MỚI */}
      {showInboundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#112240] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-in-up">
                <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Tạo Lệnh Nhập Kho (Inbound Order)</h3>
                    <button onClick={() => setShowInboundModal(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Thông tin hàng hóa</span>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <select 
                                  value={newInbound.sku}
                                  onChange={(e) => setNewInbound({...newInbound, sku: e.target.value})}
                                  className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none w-full text-white"
                                >
                                    <option value="VNM-01">Sữa tươi Vinamilk (VNM-01)</option>
                                    <option value="VNM-02">Sữa chua nha đam (VNM-02)</option>
                                    <option value="THM-01">Sữa hạt TH True Nut (THM-01)</option>
                                </select>
                                <div className="flex space-x-2">
                                    <input 
                                      type="number" 
                                      placeholder="Số lượng" 
                                      value={newInbound.quantity || ''}
                                      onChange={(e) => setNewInbound({...newInbound, quantity: Number(e.target.value)})}
                                      className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none w-full text-white" 
                                    />
                                    <select 
                                      value={newInbound.unit}
                                      onChange={(e) => setNewInbound({...newInbound, unit: e.target.value})}
                                      className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm outline-none w-24 text-white"
                                    >
                                        <option>Thùng</option>
                                        <option>Hộp</option>
                                        <option>Pallet</option>
                                    </select>
                                </div>
                            </div>
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-xs font-bold text-slate-500 uppercase">Ngày sản xuất</span>
                                <input 
                                  type="date" 
                                  value={newInbound.prodDate}
                                  onChange={(e) => setNewInbound({...newInbound, prodDate: e.target.value})}
                                  className="mt-2 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none w-full text-white" 
                                />
                            </label>
                            <label className="block">
                                <span className="text-xs font-bold text-slate-500 uppercase">Hạn sử dụng (Bắt buộc)</span>
                                <input 
                                  type="date" 
                                  value={newInbound.expiryDate}
                                  onChange={(e) => setNewInbound({...newInbound, expiryDate: e.target.value})}
                                  className="mt-2 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:border-red-500 outline-none w-full text-white" 
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Vị trí lưu kho (AI Suggestion)</span>
                            <div className="mt-2 p-3 bg-blue-900/10 border border-blue-500/30 rounded-lg flex items-center justify-between">
                                <div className="flex items-center text-sm text-blue-400">
                                    <Map size={16} className="mr-2" />
                                    <span>Gợi ý: <span className="font-bold">{newInbound.location}</span> (Còn trống 50 slot)</span>
                                </div>
                                <button className="text-[10px] font-bold text-blue-500 underline">Thay đổi</button>
                            </div>
                        </label>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <button onClick={() => setShowInboundModal(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all">Hủy</button>
                        <button 
                          onClick={handleSaveInbound}
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex justify-center items-center shadow-lg shadow-blue-500/30"
                        >
                            <Save size={18} className="mr-2" /> Lưu & In phiếu nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* MODAL: IN MÃ VẠCH */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
             <div className="bg-[#112240] border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-slide-in-up">
                <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Cấu hình In Mã vạch (Barcode Label)</h3>
                    <button onClick={() => setShowBarcodeModal(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                </div>
                <div className="grid md:grid-cols-2">
                    <div className="p-8 border-r border-slate-700 space-y-6">
                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Chọn mẫu tem</span>
                            <div className="mt-3 space-y-3">
                                <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-blue-500/50 rounded-lg cursor-pointer">
                                    <div className="w-4 h-4 rounded-full border-4 border-blue-500"></div>
                                    <span className="text-sm">Tem sản phẩm (Item Label - 4x6cm)</span>
                                </label>
                                <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer opacity-50">
                                    <div className="w-4 h-4 rounded-full border border-slate-500"></div>
                                    <span className="text-sm">Tem kệ (Shelf Label - 10x15cm)</span>
                                </label>
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Số lượng bản in</span>
                            <input type="number" defaultValue={10} className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500 text-white" />
                        </label>
                        <div className="pt-4 flex gap-3">
                            <button className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center"><Check size={18} className="mr-2" /> Kết nối máy in</button>
                            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">In ngay</button>
                        </div>
                    </div>
                    <div className="p-8 bg-slate-900/50 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-slate-500 uppercase mb-6 self-start">Xem trước (Preview)</span>
                        <div className="bg-white p-6 rounded shadow-2xl w-64 aspect-[2/3] text-black flex flex-col items-center">
                            <div className="text-[10px] font-bold mb-2">SmartE-Logistics</div>
                            <div className="font-bold text-xs text-center border-b border-black pb-1 mb-2">VNM-01: Sữa tươi Vinamilk</div>
                            <img src="https://barcodeapi.org/api/128/VNM-01" alt="barcode" className="w-full my-4" />
                            <div className="text-[8px] font-bold self-start mt-2">HSD: 25/03/2025</div>
                            <div className="text-[12px] font-bold self-start mt-1">Vị trí: A-05-02</div>
                            <div className="mt-auto text-[8px] opacity-50">ID: #ORD-00123</div>
                        </div>
                        <p className="text-xs text-slate-500 mt-6">Kích thước in thực tế: 40mm x 60mm</p>
                    </div>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;