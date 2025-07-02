import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, Loader2, BarChart3, FileText } from 'lucide-react';

interface BatchPredictionResult {
  predictions: Array<{
    prediction: string;
    confidence: number;
    is_intrusion: boolean;
  }>;
  total_records: number;
  intrusion_count: number;
}

const BatchAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BatchPredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState('');

  const sampleData = {
    "data": [
      {
        "duration": 0.5,
        "protocol_type": "tcp",
        "service": "http",
        "flag": "SF",
        "src_bytes": 1024,
        "dst_bytes": 2048,
        "land": 0,
        "wrong_fragment": 0,
        "urgent": 0,
        "hot": 0,
        "num_failed_logins": 0,
        "logged_in": 1,
        "num_compromised": 0,
        "root_shell": 0,
        "su_attempted": 0,
        "num_root": 0,
        "num_file_creations": 0,
        "num_shells": 0,
        "num_access_files": 0,
        "num_outbound_cmds": 0,
        "is_host_login": 0,
        "is_guest_login": 0,
        "count": 5,
        "srv_count": 3,
        "serror_rate": 0.0,
        "srv_serror_rate": 0.0,
        "rerror_rate": 0.0,
        "srv_rerror_rate": 0.0,
        "same_srv_rate": 0.6,
        "diff_srv_rate": 0.4,
        "srv_diff_host_rate": 0.2,
        "dst_host_count": 10,
        "dst_host_srv_count": 8,
        "dst_host_same_srv_rate": 0.8,
        "dst_host_diff_srv_rate": 0.2,
        "dst_host_same_src_port_rate": 0.1,
        "dst_host_srv_diff_host_rate": 0.3,
        "dst_host_serror_rate": 0.0,
        "dst_host_srv_serror_rate": 0.0,
        "dst_host_rerror_rate": 0.0,
        "dst_host_srv_rerror_rate": 0.0
      }
    ]
  };

  const handleAnalysis = async () => {
    if (!jsonInput.trim()) {
      setError('JSON məlumatları daxil edin');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = JSON.parse(jsonInput);
      
      const response = await fetch('http://192.168.0.198:8000/predict/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API xətası: ${response.status}`);
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('JSON formatı səhvdir');
      } else {
        setError(err instanceof Error ? err.message : 'Bilinməyən xəta baş verdi');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    setJsonInput(JSON.stringify(sampleData, null, 2));
    setError(null);
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  const getSuccessRate = () => {
    if (!result) return 0;
    return ((result.total_records - result.intrusion_count) / result.total_records) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Upload className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Toplu Şəbəkə Analizi</h2>
            <p className="text-slate-400 mt-1">Çoxlu şəbəkə bağlantılarını eyni anda analiz edin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">JSON Məlumatları</h3>
              <button
                onClick={loadSampleData}
                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all duration-200 text-sm"
              >
                Nümunə Yüklə
              </button>
            </div>
            
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="JSON məlumatlarını buraya əlavə edin..."
              className="w-full h-64 bg-slate-900/50 border border-slate-600/50 rounded-lg p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
            />
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-slate-400">
                Format: {"{ \"data\": [...] }"}
              </span>
              <button
                onClick={handleAnalysis}
                disabled={loading || !jsonInput.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 disabled:bg-slate-700/50 disabled:text-slate-500 text-purple-400 rounded-lg border border-purple-500/30 disabled:border-slate-600/30 transition-all duration-200"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BarChart3 className="h-4 w-4" />
                )}
                <span>{loading ? 'Analiz Edilir...' : 'Analiz Et'}</span>
              </button>
            </div>
          </div>

          {loading && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
                <span className="text-white font-medium">Toplu analiz edilir...</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400">Xəta</h3>
                  <p className="text-red-300 mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={resetAnalysis}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 transition-all duration-200"
              >
                Yenidən Cəhd Et
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Analiz Nəticələri</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <div className="text-2xl font-bold text-white">{result.total_records}</div>
                    <div className="text-sm text-slate-400">Ümumi Qeyd</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <div className="text-2xl font-bold text-red-400">{result.intrusion_count}</div>
                    <div className="text-sm text-slate-400">Müdaxilə</div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Təhlükəsizlik Reytinqi</span>
                    <span className={`font-medium ${
                      getSuccessRate() >= 80 ? 'text-green-400' : 
                      getSuccessRate() >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {getSuccessRate().toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        getSuccessRate() >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                        getSuccessRate() >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                        'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${getSuccessRate()}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 max-h-96 overflow-hidden">
                <div className="p-6 border-b border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white">Təfsilatlı Nəticələr</h4>
                </div>
                <div className="overflow-y-auto max-h-80 p-6">
                  <div className="space-y-3">
                    {result.predictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-center space-x-3">
                          {prediction.is_intrusion ? (
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          )}
                          <div>
                            <span className="text-white font-medium">Qeyd #{index + 1}</span>
                            <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                              prediction.is_intrusion 
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                : 'bg-green-500/10 text-green-400 border border-green-500/20'
                            }`}>
                              {prediction.prediction === 'normal' ? 'Normal' : 'Anomaliya'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            prediction.is_intrusion ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {(prediction.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={resetAnalysis}
                  className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-lg border border-slate-600/50 transition-all duration-200"
                >
                  Yeni Analiz
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/30 transition-all duration-200">
                  Hesabatı Endir
                </button>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/30 text-center">
              <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-400 mb-2">Toplu Analiz Gözlənilir</h3>
              <p className="text-slate-500 text-sm">JSON məlumatlarını daxil edin və analiz düyməsini basın</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchAnalysis;