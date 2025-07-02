import React, { useState } from 'react';
import { Send, RotateCcw } from 'lucide-react';

interface NetworkData {
  duration: number;
  protocol_type: string;
  service: string;
  flag: string;
  src_bytes: number;
  dst_bytes: number;
  land: number;
  wrong_fragment: number;
  urgent: number;
  hot: number;
  num_failed_logins: number;
  logged_in: number;
  num_compromised: number;
  root_shell: number;
  su_attempted: number;
  num_root: number;
  num_file_creations: number;
  num_shells: number;
  num_access_files: number;
  num_outbound_cmds: number;
  is_host_login: number;
  is_guest_login: number;
  count: number;
  srv_count: number;
  serror_rate: number;
  srv_serror_rate: number;
  rerror_rate: number;
  srv_rerror_rate: number;
  same_srv_rate: number;
  diff_srv_rate: number;
  srv_diff_host_rate: number;
  dst_host_count: number;
  dst_host_srv_count: number;
  dst_host_same_srv_rate: number;
  dst_host_diff_srv_rate: number;
  dst_host_same_src_port_rate: number;
  dst_host_srv_diff_host_rate: number;
  dst_host_serror_rate: number;
  dst_host_srv_serror_rate: number;
  dst_host_rerror_rate: number;
  dst_host_srv_rerror_rate: number;
}

interface NetworkDataFormProps {
  onSubmit: (data: NetworkData) => void;
  loading: boolean;
}

const NetworkDataForm: React.FC<NetworkDataFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<NetworkData>({
    duration: 0,
    protocol_type: 'tcp',
    service: 'http',
    flag: 'SF',
    src_bytes: 181,
    dst_bytes: 5450,
    land: 0,
    wrong_fragment: 0,
    urgent: 0,
    hot: 0,
    num_failed_logins: 0,
    logged_in: 1,
    num_compromised: 0,
    root_shell: 0,
    su_attempted: 0,
    num_root: 0,
    num_file_creations: 0,
    num_shells: 0,
    num_access_files: 0,
    num_outbound_cmds: 0,
    is_host_login: 0,
    is_guest_login: 0,
    count: 9,
    srv_count: 9,
    serror_rate: 0.0,
    srv_serror_rate: 0.0,
    rerror_rate: 0.0,
    srv_rerror_rate: 0.0,
    same_srv_rate: 1.0,
    diff_srv_rate: 0.0,
    srv_diff_host_rate: 0.0,
    dst_host_count: 9,
    dst_host_srv_count: 9,
    dst_host_same_srv_rate: 1.0,
    dst_host_diff_srv_rate: 0.0,
    dst_host_same_src_port_rate: 1.0,
    dst_host_srv_diff_host_rate: 0.0,
    dst_host_serror_rate: 0.0,
    dst_host_srv_serror_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0
  });

  const protocolTypes = ['tcp', 'udp', 'icmp'];
  const services = ['http', 'smtp', 'finger', 'ftp', 'telnet', 'ssh', 'pop_3', 'ftp_data', 'dns', 'private'];
  const flags = ['SF', 'S0', 'REJ', 'RSTR', 'RSTO', 'SH', 'S1', 'S2', 'RSTOS0', 'OTH'];

  const handleChange = (field: keyof NetworkData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      duration: 0,
      protocol_type: 'tcp',
      service: 'http',
      flag: 'SF',
      src_bytes: 181,
      dst_bytes: 5450,
      land: 0,
      wrong_fragment: 0,
      urgent: 0,
      hot: 0,
      num_failed_logins: 0,
      logged_in: 1,
      num_compromised: 0,
      root_shell: 0,
      su_attempted: 0,
      num_root: 0,
      num_file_creations: 0,
      num_shells: 0,
      num_access_files: 0,
      num_outbound_cmds: 0,
      is_host_login: 0,
      is_guest_login: 0,
      count: 9,
      srv_count: 9,
      serror_rate: 0.0,
      srv_serror_rate: 0.0,
      rerror_rate: 0.0,
      srv_rerror_rate: 0.0,
      same_srv_rate: 1.0,
      diff_srv_rate: 0.0,
      srv_diff_host_rate: 0.0,
      dst_host_count: 9,
      dst_host_srv_count: 9,
      dst_host_same_srv_rate: 1.0,
      dst_host_diff_srv_rate: 0.0,
      dst_host_same_src_port_rate: 1.0,
      dst_host_srv_diff_host_rate: 0.0,
      dst_host_serror_rate: 0.0,
      dst_host_srv_serror_rate: 0.0,
      dst_host_rerror_rate: 0.0,
      dst_host_srv_rerror_rate: 0.0
    });
  };

  const inputGroups = [
    {
      title: 'Əsas Bağlantı Məlumatları',
      fields: [
        { key: 'duration', label: 'Müddət (saniyə)', type: 'number', step: '0.1' },
        { key: 'protocol_type', label: 'Protokol Növü', type: 'select', options: protocolTypes },
        { key: 'service', label: 'Xidmət', type: 'select', options: services },
        { key: 'flag', label: 'Bağlantı Statusu', type: 'select', options: flags },
        { key: 'src_bytes', label: 'Mənbə Baytları', type: 'number' },
        { key: 'dst_bytes', label: 'Təyinat Baytları', type: 'number' }
      ]
    },
    {
      title: 'Bağlantı Xüsusiyyətləri',
      fields: [
        { key: 'land', label: 'Land Hücumu', type: 'select', options: ['0', '1'] },
        { key: 'wrong_fragment', label: 'Səhv Parça', type: 'number' },
        { key: 'urgent', label: 'Təcili Paketlər', type: 'number' },
        { key: 'hot', label: 'Hot İndikatorları', type: 'number' },
        { key: 'num_failed_logins', label: 'Uğursuz Girişlər', type: 'number' },
        { key: 'logged_in', label: 'Uğurlu Giriş', type: 'select', options: ['0', '1'] }
      ]
    },
    {
      title: 'Təhlükəsizlik Xüsusiyyətləri',
      fields: [
        { key: 'num_compromised', label: 'Pozulmuş Şərtlər', type: 'number' },
        { key: 'root_shell', label: 'Root Shell', type: 'select', options: ['0', '1'] },
        { key: 'su_attempted', label: 'Su Cəhdi', type: 'select', options: ['0', '1'] },
        { key: 'num_root', label: 'Root Əməliyyatları', type: 'number' },
        { key: 'num_file_creations', label: 'Fayl Yaradılması', type: 'number' },
        { key: 'num_shells', label: 'Shell Sayı', type: 'number' }
      ]
    },
    {
      title: 'Trafik Xüsusiyyətləri',
      fields: [
        { key: 'count', label: 'Bağlantı Sayı', type: 'number' },
        { key: 'srv_count', label: 'Xidmət Sayı', type: 'number' },
        { key: 'serror_rate', label: 'SYN Xəta Nisbəti', type: 'number', step: '0.01' },
        { key: 'srv_serror_rate', label: 'Xidmət SYN Xəta Nisbəti', type: 'number', step: '0.01' },
        { key: 'rerror_rate', label: 'REJ Xəta Nisbəti', type: 'number', step: '0.01' },
        { key: 'srv_rerror_rate', label: 'Xidmət REJ Xəta Nisbəti', type: 'number', step: '0.01' }
      ]
    },
    {
      title: 'Host Əsaslı Xüsusiyyətlər',
      fields: [
        { key: 'dst_host_count', label: 'Təyinat Host Sayı', type: 'number' },
        { key: 'dst_host_srv_count', label: 'Təyinat Host Xidmət Sayı', type: 'number' },
        { key: 'dst_host_same_srv_rate', label: 'Eyni Xidmət Nisbəti', type: 'number', step: '0.01' },
        { key: 'dst_host_diff_srv_rate', label: 'Fərqli Xidmət Nisbəti', type: 'number', step: '0.01' },
        { key: 'dst_host_same_src_port_rate', label: 'Eyni Port Nisbəti', type: 'number', step: '0.01' },
        { key: 'dst_host_srv_diff_host_rate', label: 'Fərqli Host Nisbəti', type: 'number', step: '0.01' }
      ]
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Şəbəkə Məlumatları Forması</h3>
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-700/70 text-slate-400 rounded-lg border border-slate-600/50 transition-all duration-200 text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-96 overflow-y-auto">
        {inputGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700/50 pb-2">
              {group.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="block text-xs font-medium text-slate-400">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key as keyof NetworkData]}
                      onChange={(e) => handleChange(field.key as keyof NetworkData, 
                        field.key.includes('rate') || field.key === 'duration' ? 
                        parseFloat(e.target.value) : 
                        field.options && !isNaN(Number(e.target.value)) ? 
                        parseInt(e.target.value) : e.target.value
                      )}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      step={field.step}
                      value={formData[field.key as keyof NetworkData]}
                      onChange={(e) => handleChange(field.key as keyof NetworkData, 
                        field.type === 'number' ? 
                        (field.step ? parseFloat(e.target.value) : parseInt(e.target.value) || 0) : 
                        e.target.value
                      )}
                      className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-slate-700/50 disabled:text-slate-500 text-blue-400 rounded-lg border border-blue-500/30 disabled:border-slate-600/30 transition-all duration-200 font-medium"
          >
            <Send className="h-4 w-4" />
            <span>{loading ? 'Analiz Edilir...' : 'Analiz Et'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NetworkDataForm;