import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import DashboardHome from './components/DashboardHome.tsx';
import GreenMonitor from './components/GreenMonitor.tsx';
import CostEngine from './components/CostEngine.tsx';
import Inventory from './components/Inventory.tsx';
import Settings from './components/Settings.tsx';
import LandingPage from './components/LandingPage.tsx';
import { Tab } from './types.ts';
import { COLORS } from './constants.ts';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab(Tab.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <DashboardHome />;
      case Tab.GREEN:
        return <GreenMonitor />;
      case Tab.COST:
        return <CostEngine />;
      case Tab.INVENTORY:
        return <Inventory />;
      case Tab.SETTINGS:
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen font-sans text-slate-300 animate-fade-in" style={{ backgroundColor: COLORS.bg }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-700 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md bg-[#0A192F]/80">
           <div className="text-sm text-slate-500 overflow-hidden whitespace-nowrap">
              SmartE-Logistics / <span className="text-white font-medium capitalize">{activeTab.toLowerCase().replace('_', ' ')}</span>
           </div>
           <div className="flex items-center space-x-4 shrink-0">
              <div className="text-xs text-right hidden md:block">
                  <div className="text-white font-bold">Admin User</div>
                  <div className="text-slate-500">Logistics Manager</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                  AU
              </div>
           </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>

        <footer className="h-12 border-t border-slate-800 flex items-center justify-center text-[10px] text-slate-600 px-4 text-center">
           © 2025 SmartE-Logistics Dashboard | Developed by Group 02 From UTE - Project E-Logistics.
        </footer>
      </div>
    </div>
  );
};

export default App;