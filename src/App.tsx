import React, { useState } from 'react';
import { Shield, AlertTriangle, Activity, Database, FileCheck, Upload } from 'lucide-react';
import SingleAnalysis from './components/SingleAnalysis';
import BatchAnalysis from './components/BatchAnalysis';

type TabType =  'single' | 'batch';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('single');

  const tabs = [
    { id: 'single' as TabType, label: 'Tək Analiz', icon: FileCheck },
    { id: 'batch' as TabType, label: 'Toplu Analiz', icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Şəbəkə Müdaxilə Aşkarlama Sistemi</h1>
                <p className="text-sm text-slate-400">NIDS - Network Intrusion Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Aktiv</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'single' && <SingleAnalysis />}
        {activeTab === 'batch' && <BatchAnalysis />}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">API: https://nids-server.onrender.com</span>
            </div>
            <p className="text-sm text-slate-500">© 2025 NIDS - Bütün hüquqlar qorunur</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;