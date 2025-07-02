import React, { useState } from 'react';
import { FileCheck, AlertTriangle, CheckCircle, Loader2, Send } from 'lucide-react';
import NetworkDataForm from './NetworkDataForm';
import axios from 'axios';

interface PredictionResult {
  prediction: string;
  confidence: number;
  is_intrusion: boolean;
}

const SingleAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

const handleAnalysis = async (data: any) => {
  setLoading(true);
  setError(null);
  setResult(null);

  try {
    const response = await axios.post('http://192.168.0.198:8000/predict', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setResult(response.data);
  } catch (err: any) {
    setError(
      err.response?.data?.message ||
      err.message ||
      'Bilinməyən xəta baş verdi'
    );
  } finally {
    setLoading(false);
  }
};

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <FileCheck className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Tək Şəbəkə Bağlantısı Analizi</h2>
            <p className="text-slate-400 mt-1">Bir şəbəkə bağlantısının təhlükəsizlik vəziyyətini analiz edin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <NetworkDataForm onSubmit={handleAnalysis} loading={loading} />
          
          {loading && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                <span className="text-white font-medium">Analiz edilir...</span>
              </div>
              <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
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
              {/* Main Result */}
              <div className={`backdrop-blur-sm rounded-xl p-6 border ${
                result.is_intrusion 
                  ? 'bg-red-500/10 border-red-500/20' 
                  : 'bg-green-500/10 border-green-500/20'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  {result.is_intrusion ? (
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold ${
                      result.is_intrusion ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {result.is_intrusion ? 'TƏHDID AŞKARLANMIŞ' : 'TƏHLÜKƏSİZ'}
                    </h3>
                    <p className="text-slate-400">
                      Proqnoz: {result.prediction === 'normal' ? 'Normal' : 'Anomaliya'}
                    </p>
                  </div>
                </div>
                
                {/* Confidence Level */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Etibar Səviyyəsi</span>
                    <span className={`font-medium ${
                      result.is_intrusion ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        result.is_intrusion 
                          ? 'bg-gradient-to-r from-red-500 to-red-400' 
                          : 'bg-gradient-to-r from-green-500 to-green-400'
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-4">Təfsilat</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm text-slate-400">Status</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      result.is_intrusion 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {result.is_intrusion ? 'Müdaxilə' : 'Təhlükəsiz'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-slate-400">Tip</span>
                    <div className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-sm">
                      {result.prediction === 'normal' ? 'Normal Trafik' : 'Şübhəli Fəaliyyət'}
                    </div>
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
                <button className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all duration-200">
                  Nəticəni Saxla
                </button>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/30 text-center">
              <FileCheck className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-400 mb-2">Analiz Gözlənilir</h3>
              <p className="text-slate-500 text-sm">Şəbəkə məlumatlarını daxil edin və analiz düyməsini basın</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAnalysis;