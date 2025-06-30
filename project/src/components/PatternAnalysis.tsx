import React from 'react';
import { PatternAnalysis as PatternAnalysisType } from '../types';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface PatternAnalysisProps {
  pattern: PatternAnalysisType;
}

const PatternAnalysis: React.FC<PatternAnalysisProps> = ({ pattern }) => {
  const getIcon = () => {
    switch (pattern.type) {
      case 'bullish':
        return <TrendingUp className="text-green-400" size={24} />;
      case 'bearish':
        return <TrendingDown className="text-red-400" size={24} />;
      default:
        return <Minus className="text-yellow-400" size={24} />;
    }
  };

  const getTypeColor = () => {
    switch (pattern.type) {
      case 'bullish':
        return 'text-green-400';
      case 'bearish':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getConfidenceColor = () => {
    if (pattern.confidence >= 80) return 'text-green-400';
    if (pattern.confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBarColor = () => {
    if (pattern.confidence >= 80) return 'bg-green-400';
    if (pattern.confidence >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Target className="text-blue-400" size={24} />
        Pattern Analysis
      </h2>
      
      <div className="space-y-6">
        {/* Pattern Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <h3 className="text-lg font-bold text-white">{pattern.pattern}</h3>
              <span className={`text-sm font-medium ${getTypeColor()}`}>
                {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} Pattern
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getConfidenceColor()}`}>
              {pattern.confidence}%
            </div>
            <div className="text-sm text-gray-400">Confidence</div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Pattern Strength</span>
            <span className={`text-sm font-medium ${getConfidenceColor()}`}>
              {pattern.confidence >= 80 ? 'Strong' : 
               pattern.confidence >= 60 ? 'Moderate' : 'Weak'}
            </span>
          </div>
          <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${getConfidenceBarColor()}`}
              style={{ width: `${pattern.confidence}%` }}
            />
          </div>
        </div>

        {/* Pattern Description */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Pattern Description</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {pattern.description}
          </p>
        </div>

        {/* Trading Advice */}
        <div className={`p-4 rounded-lg border-l-4 ${
          pattern.type === 'bullish' ? 'bg-green-900/20 border-green-400' :
          pattern.type === 'bearish' ? 'bg-red-900/20 border-red-400' :
          'bg-yellow-900/20 border-yellow-400'
        }`}>
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            {getIcon()}
            Trading Advice
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {pattern.tradingAdvice}
          </p>
        </div>

        {/* Pattern Reliability */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="text-lg font-bold text-white">{pattern.confidence}%</div>
            <div className="text-xs text-gray-400">Reliability</div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className={`text-lg font-bold ${getTypeColor()}`}>
              {pattern.type === 'bullish' ? '↗' : pattern.type === 'bearish' ? '↘' : '→'}
            </div>
            <div className="text-xs text-gray-400">Direction</div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="text-lg font-bold text-white">
              {pattern.confidence >= 75 ? 'High' : pattern.confidence >= 50 ? 'Med' : 'Low'}
            </div>
            <div className="text-xs text-gray-400">Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternAnalysis;