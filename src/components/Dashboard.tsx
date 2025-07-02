import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Users, Globe } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Ümumi Şəbəkə Bağlantıları',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Globe,
      color: 'blue'
    },
    {
      name: 'Təhlükəsiz Bağlantılar',
      value: '956',
      change: '+8%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'green'
    },
    {
      name: 'Aşkarlanmış Müdaxilələr',
      value: '291',
      change: '-5%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Təhlükəsizlik Reytinqi',
      value: '92%',
      change: '+2%',
      changeType: 'increase',
      icon: Shield,
      color: 'purple'
    }
  ];

  const recentThreats = [
    {
      id: 1,
      type: 'Port Skan',
      severity: 'Yüksək',
      source: '192.168.1.45',
      time: '5 dəqiqə əvvəl',
      confidence: 94
    },
    {
      id: 2,
      type: 'DoS Hücumu',
      severity: 'Kritik',
      source: '10.0.0.23',
      time: '12 dəqiqə əvvəl',
      confidence: 98
    },
    {
      id: 3,
      type: 'Şüphəli Trafik',
      severity: 'Orta',
      source: '172.16.0.12',
      time: '18 dəqiqə əvvəl',
      confidence: 76
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      'Kritik': 'bg-red-500/10 text-red-400 border-red-500/20',
      'Yüksək': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Orta': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'Aşağı': 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };
    return colors[severity as keyof typeof colors] || colors['Orta'];
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Şəbəkə Təhlükəsizliyi İdarə Paneli</h2>
            <p className="text-slate-400 mt-1">Real vaxt rejimində şəbəkə trafikini monitorinq edin və təhdidləri aşkar edin</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${stat.changeType === 'decrease' ? 'rotate-180' : ''}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Threats */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Son Aşkarlanmış Təhdidlər</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentThreats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{threat.type}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Mənbə: {threat.source} • {threat.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Etibar</div>
                    <div className="text-white font-medium">{threat.confidence}%</div>
                  </div>
                  <div className="w-16 h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${threat.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Tez Əməliyyatlar</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 hover:border-blue-500/30 transition-all duration-200 text-left">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span className="text-white">Yeni Analiz Başlat</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/20 hover:border-purple-500/30 transition-all duration-200 text-left">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-white">Toplu Analiz Et</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Sistem Statusu</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Bağlantısı</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Aktiv</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Məlumat Bazası</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Bağlı</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Monitorinq</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">İşləyir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;