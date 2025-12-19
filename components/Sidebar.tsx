import React from 'react';
import { LayoutDashboard, Leaf, Calculator, Package, Settings, LogOut } from 'lucide-react';
import { COLORS } from '../constants.ts';
import { Tab } from '../types.ts';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: Tab.DASHBOARD, label: 'Tổng quan', icon: LayoutDashboard },
    { id: Tab.GREEN, label: 'Giám sát Năng lượng', icon: Leaf },
    { id: Tab.COST, label: 'Tối ưu Chi phí', icon: Calculator },
    { id: Tab.INVENTORY, label: 'Kho hàng', icon: Package },
    { id: Tab.SETTINGS, label: 'Cấu hình', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen flex flex-col border-r border-slate-700 fixed left-0 top-0 z-30" style={{ backgroundColor: COLORS.surface }}>
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wider text-center" style={{ color: COLORS.accentBlue }}>
          SmartE-Logistics
        </h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-opacity-10 text-white' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            style={{ 
              backgroundColor: activeTab === item.id ? `${COLORS.accentBlue}20` : 'transparent',
              color: activeTab === item.id ? COLORS.accentBlue : undefined
            }}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
            <LogOut size={20} />
            <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;