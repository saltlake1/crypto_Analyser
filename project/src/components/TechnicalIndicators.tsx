import React from 'react';
import { Activity, TrendingUp, BarChart2, Target } from 'lucide-react';
import { TechnicalIndicators as TechnicalIndicatorsType } from '../types';

interface TechnicalIndicatorsProps {
  indicators: TechnicalIndicatorsType;
}

const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({ indicators }) => {
  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return 'text-red-400';
    if (rsi < 30) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getRSIStatus = (rsi: number) => {
    if (rsi > 70) return 'Overbought';
    if (rsi < 30) return 'Oversold';
    return 'Neutral';
  };

  const getMASignal = () => {
    const { sma20, sma50, sma200 } = indicators.movingAverages;
    if (sma20 > sma50 && sma50 > sma200) return { signal: 'Bullish', color: 'text-green-400' };
    if (sma20 < sma50 && sma50 < sma200) return { signal: 'Bearish', color: 'text-red-400' };
    return { signal: 'Mixed', color: 'text-yellow-400' };
  };

  const getStochasticSignal = () => {
    const { k, d } = indicators.stochastic;
    if (k > 80 || d > 80) return { signal: 'Overbought', color: 'text-red-400' };
    if (k < 20 || d < 20) return { signal: 'Oversold', color: 'text-green-400' };
    return { signal: 'Neutral', color: 'text-yellow-400' };
  };

  const maSignal = getMASignal();
  const stochSignal = getStochasticSignal();

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-blue-400" size={24} />
        Technical Indicators
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RSI */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">RSI (14)</span>
            <span className={`text-sm font-medium ${getRSIColor(indicators.rsi)}`}>
              {getRSIStatus(indicators.rsi)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    indicators.rsi > 70 ? 'bg-red-400' : 
                    indicators.rsi < 30 ? 'bg-green-400' : 'bg-yellow-400'
                  }`}
                  style={{ width: `${indicators.rsi}%` }}
                />
              </div>
            </div>
            <span className="text-white font-bold text-lg">{indicators.rsi.toFixed(1)}</span>
          </div>
        </div>

        {/* MACD */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">MACD</span>
            <span className={`text-sm font-medium ${
              indicators.macd.histogram > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {indicators.macd.histogram > 0 ? 'Bullish' : 'Bearish'}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">MACD:</span>
              <span className="text-white">{indicators.macd.macd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Signal:</span>
              <span className="text-white">{indicators.macd.signal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Histogram:</span>
              <span className={indicators.macd.histogram > 0 ? 'text-green-400' : 'text-red-400'}>
                {indicators.macd.histogram.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Moving Averages */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Moving Averages</span>
            <span className={`text-sm font-medium ${maSignal.color}`}>
              {maSignal.signal}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">SMA 20:</span>
              <span className="text-white">{indicators.movingAverages.sma20.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">SMA 50:</span>
              <span className="text-white">{indicators.movingAverages.sma50.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">SMA 200:</span>
              <span className="text-white">{indicators.movingAverages.sma200.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bollinger Bands */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Bollinger Bands</span>
            <Target className="text-blue-400" size={16} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Upper:</span>
              <span className="text-white">{indicators.bollingerBands.upper.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Middle:</span>
              <span className="text-white">{indicators.bollingerBands.middle.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lower:</span>
              <span className="text-white">{indicators.bollingerBands.lower.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Stochastic */}
        <div className="bg-gray-700 p-4 rounded-lg md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Stochastic Oscillator</span>
            <span className={`text-sm font-medium ${stochSignal.color}`}>
              {stochSignal.signal}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">%K:</span>
              <span className="text-white">{indicators.stochastic.k.toFixed(1)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">%D:</span>
              <span className="text-white">{indicators.stochastic.d.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;