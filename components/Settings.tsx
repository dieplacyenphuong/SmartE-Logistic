import React, { useState } from 'react';
import { Bell, Zap, Users, Shield, Save, Check, Edit, X, UserCheck, Bot, Smartphone, Terminal } from 'lucide-react';
import { COLORS } from '../constants';

const INITIAL_USERS = [
    {name: 'Nguyễn Văn A', role: 'Quản lý Kho', permission: 'Full Access'},
    {name: 'Trần Thị B', role: 'Nhân viên Xuất hàng', permission: 'Scan & Outbound Only'},
    {name: 'Lê Văn C', role: 'Thực tập sinh', permission: 'View Only'},
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALERTS' | 'ENERGY' | 'USERS'>('ALERTS');
  const [saved, setSaved] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'SME' | 'ENTERPRISE'>('SME');
  const [users, setUsers] = useState(INITIAL_USERS);

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleSaveConfig = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddUser = () => {
    if (!newUser.name) return;
    
    const roleMapping = {
      'SME': newUser.role || 'Nhân viên Kho (SME)',
      'ENTERPRISE': newUser.role || 'Kỹ sư vận hành (Enterprise)'
    };

    setUsers([
      ...users,
      {
        name: newUser.name,
        role: roleMapping[selectedTier],
        permission: selectedTier === 'ENTERPRISE' ? 'Automation Access' : 'Mobile Access'
      }
    ]);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', password: '', role: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>Configuration</h2>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>Hệ thống & Cài đặt định mức</p>
        </div>
        <button 
          onClick={handleSaveConfig}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-500 transition-all font-bold"
        >
          {saved ? <Check size={18} className="mr-2" /> : <Save size={18} className="mr-2" />}
          {saved ? 'ĐÃ LƯU' : 'LƯU THAY ĐỔI'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-px">
        <button 
          onClick={() => setActiveTab('ALERTS')}
          className={`px-6 py-3 text-sm font-bold flex items-center transition-all border-b-2 ${activeTab === 'ALERTS' ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
        >
          <Bell size={16} className="mr-2" /> Cảnh báo FEFO
        </button>
        <button 
          onClick={() => setActiveTab('ENERGY')}
          className={`px-6 py-3 text-sm font-bold flex items-center transition-all border-b-2 ${activeTab === 'ENERGY' ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
        >
          <Zap size={16} className="mr-2" /> Định mức Năng lượng
        </button>
        <button 
          onClick={() => setActiveTab('USERS')}
          className={`px-6 py-3 text-sm font-bold flex items-center transition-all border-b-2 ${activeTab === 'USERS' ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
        >
          <Users size={16} className="mr-2" /> Quản lý Nhân sự
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 rounded-lg border border-slate-800" style={{ backgroundColor: COLORS.surface }}>
        {activeTab === 'ALERTS' && (
          <div className="space-y-8 animate-fade-in">
             <div>
                <h3 className="text-lg font-bold mb-4">Thiết lập ngưỡng FEFO</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="block text-white">
                            <span className="text-xs text-slate-500 uppercase font-bold">Cảnh báo đỏ (Nguy hiểm)</span>
                            <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm">Hạn sử dụng dưới</span>
                                <input type="number" defaultValue={30} className="bg-slate-900 border border-slate-700 rounded p-2 w-20 text-center outline-none focus:border-red-500 text-white" />
                                <span className="text-sm">ngày</span>
                            </div>
                        </label>
                        <label className="block text-white">
                            <span className="text-xs text-slate-500 uppercase font-bold">Cảnh báo vàng (Cần đẩy hàng)</span>
                            <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm">Hạn sử dụng dưới</span>
                                <input type="number" defaultValue={60} className="bg-slate-900 border border-slate-700 rounded p-2 w-20 text-center outline-none focus:border-yellow-500 text-white" />
                                <span className="text-sm">ngày</span>
                            </div>
                        </label>
                    </div>
                </div>
             </div>

             <div className="pt-8 border-t border-slate-800">
                <h3 className="text-lg font-bold mb-4">Cảnh báo tồn kho an toàn</h3>
                <div className="flex items-center space-x-3 text-white">
                    <span className="text-sm">Cảnh báo nhập hàng khi số lượng dưới</span>
                    <input type="number" defaultValue={100} className="bg-slate-900 border border-slate-700 rounded p-2 w-24 text-center outline-none focus:border-blue-500 text-white" />
                    <span className="text-sm">đơn vị (thùng/kiện)</span>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'ENERGY' && (
          <div className="space-y-8 animate-fade-in">
             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <label className="block">
                        <span className="text-xs text-slate-500 uppercase font-bold">Giá điện hiện tại (VNĐ/kWh)</span>
                        <input type="number" defaultValue={2500} className="w-full mt-2 bg-slate-900 border border-slate-700 rounded p-3 outline-none focus:border-blue-500 font-mono text-white" />
                    </label>
                    <label className="block">
                        <span className="text-xs text-slate-500 uppercase font-bold">Định mức tiêu thụ cho phép (kWh/Tháng)</span>
                        <input type="number" defaultValue={1000} className="w-full mt-2 bg-slate-900 border border-slate-700 rounded p-3 outline-none focus:border-blue-500 font-mono text-white" />
                    </label>
                </div>
                <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-900/30">
                    <h4 className="text-blue-400 font-bold mb-2 flex items-center"><Zap size={16} className="mr-2" /> Tại sao cần thiết lập?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Dữ liệu này được dùng để tính toán chỉ số ROI và vẽ biểu đồ so sánh tại trang Green Monitor. Thiết lập chính xác giúp báo cáo ESG đạt độ tin cậy cao nhất cho nhà đầu tư.
                    </p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'USERS' && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Danh sách Nhân sự</h3>
                <button onClick={() => setShowUserModal(true)} className="text-xs font-bold text-blue-400 hover:underline">+ Thêm người dùng</button>
             </div>
             <div className="space-y-3">
                {users.map((user, i) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">{user.name[0]}</div>
                            <div>
                                <div className="text-sm font-bold text-white">{user.name}</div>
                                <div className="text-xs text-slate-500">{user.role}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-xs px-2 py-1 bg-blue-900/20 text-blue-400 rounded border border-blue-900/30 flex items-center">
                                <Shield size={12} className="mr-1" /> {user.permission}
                            </span>
                            <button className="text-slate-500 hover:text-white"><Edit size={16} /></button>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* MODAL: THÊM NGƯỜI DÙNG */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#112240] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-in-up">
                <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Thêm Nhân sự Mới</h3>
                    <button onClick={() => setShowUserModal(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Thông tin cơ bản</span>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <input 
                                  type="text" 
                                  placeholder="Họ và tên" 
                                  value={newUser.name}
                                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                  className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white" 
                                />
                                <input 
                                  type="email" 
                                  placeholder="Email" 
                                  value={newUser.email}
                                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                  className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white" 
                                />
                            </div>
                            <input 
                              type="password" 
                              placeholder="Mật khẩu tạm thời" 
                              value={newUser.password}
                              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                              className="w-full mt-3 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white" 
                            />
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold text-slate-500 uppercase">Phân quyền (Role Assignment)</span>
                            <div className="mt-3">
                                <span className="text-[10px] text-slate-400 mb-2 block italic underline text-white">Bước 1: Chọn Module áp dụng</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => setSelectedTier('SME')}
                                        className={`p-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${selectedTier === 'SME' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                                    >
                                        <Smartphone size={20} />
                                        <span className="text-[10px] font-bold">MODULE SME</span>
                                    </button>
                                    <button 
                                        onClick={() => setSelectedTier('ENTERPRISE')}
                                        className={`p-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${selectedTier === 'ENTERPRISE' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                                    >
                                        <Bot size={20} />
                                        <span className="text-[10px] font-bold">MODULE ENTERPRISE</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="text-[10px] text-slate-400 mb-2 block italic underline text-white">Bước 2: Chọn vai trò chi tiết</span>
                                <div className="space-y-2">
                                    {selectedTier === 'SME' ? (
                                        <>
                                            <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500/50">
                                                <input type="radio" name="role" className="accent-blue-500" onClick={() => setNewUser({...newUser, role: 'Nhân viên Kho (Mobile App User)'})} />
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-white">Nhân viên Kho (Mobile App User)</div>
                                                    <div className="text-[10px] text-slate-500">Chỉ dùng App quét mã vạch, không sửa dữ liệu.</div>
                                                </div>
                                            </label>
                                            <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500/50">
                                                <input type="radio" name="role" className="accent-blue-500" onClick={() => setNewUser({...newUser, role: 'Quản lý Kho (Warehouse Manager)'})} />
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-white">Quản lý Kho (Warehouse Manager)</div>
                                                    <div className="text-[10px] text-slate-500">Toàn quyền xem Dashboard & sửa tồn kho.</div>
                                                </div>
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500/50">
                                                <input type="radio" name="role" className="accent-blue-500" onClick={() => setNewUser({...newUser, role: 'Kỹ sư vận hành (Automation Eng)'})} />
                                                <div className="flex-1 flex items-center gap-2">
                                                    <Terminal size={12} className="text-blue-400" />
                                                    <div>
                                                        <div className="text-xs font-bold text-white">Kỹ sư vận hành (Automation Eng)</div>
                                                        <div className="text-[10px] text-slate-500">Điều khiển Robot AGV & thiết lập bản đồ kho.</div>
                                                    </div>
                                                </div>
                                            </label>
                                            <label className="flex items-center space-x-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-blue-500/50">
                                                <input type="radio" name="role" className="accent-blue-500" onClick={() => setNewUser({...newUser, role: 'Giám sát hệ thống (System Admin)'})} />
                                                <div className="flex-1 flex items-center gap-2">
                                                    <Shield size={12} className="text-blue-400" />
                                                    <div>
                                                        <div className="text-xs font-bold text-white">Giám sát hệ thống (System Admin)</div>
                                                        <div className="text-[10px] text-slate-500">Quản lý tích hợp API ERP & bảo mật.</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        </label>
                    </div>

                    <button 
                      onClick={handleAddUser}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg flex justify-center items-center"
                    >
                        <UserCheck size={18} className="mr-2" /> CẤP QUYỀN TRUY CẬP
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Settings;