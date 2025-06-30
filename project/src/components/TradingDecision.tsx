import React from 'react';
import { TradingDecision as TradingDecisionType } from '../types';
import { ShoppingCart, TrendingDown, Pause, AlertTriangle, Target, Shield } from 'lucide-react';

interface TradingDecisionProps {
  decision: TradingDecisionType;
  currentPrice: number;
}

const TradingDecision: React.FC<TradingDecisionProps> = ({ decision, currentPrice }) => {
  const getActionIcon = () => {
    switch (decision.action) {
      case 'BUY':
        return <ShoppingCart className="text-green-400" size={24} />;
      case 'SELL':
        return <TrendingDown className="text-red-400" size={24} />;
      default:
        return <Pause className="text-yellow-400" size={24} />;
    }
  };

  const getActionColor = () => {
    switch (decision.action) {
      case 'BUY':
        return 'text-green-400';
      case 'SELL':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getBackgroundColor = () => {
    switch (decision.action) {
      case 'BUY':
        return 'bg-green-900/20 border-green-400';
      case 'SELL':
        return 'bg-red-900/20 border-red-400';
      default:
        return 'bg-yellow-900/20 border-yellow-400';
    }
  };

  const getConfidenceColor = () => {
    if (decision.confidence >= 80) return 'text-green-400';
    if (decision.confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${(price / 1000).toFixed(2)}K`;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <AlertTriangle className="text-blue-400" size={24} />
        Trading Decision
      </h2>
      
      <div className="space-y-6">
        {/* Main Decision */}
        <div className={`p-6 rounded-lg border-l-4 ${getBackgroundColor()}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getActionIcon()}
              <div>
                <h3 className={`text-2xl font-bold ${getActionColor()}`}>
                  {decision.action}
                </h3>
                <p className="text-gray-400 text-sm">Recommended Action</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getConfidenceColor()}`}>
                {decision.confidence}%
              </div>
              <div className="text-sm text-gray-400">Confidence</div>
            </div>
          </div>
          
          <div className="bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full transition-all duration-500 ${
                decision.confidence >= 80 ? 'bg-green-400' :
                decision.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${decision.confidence}%` }}
            />
          </div>
          
          <p className="text-gray-300 text-sm">
            Based on technical analysis, the recommendation is to <strong className={getActionColor()}>
              {decision.action}
            </strong> with {decision.confidence}% confidence over the {decision.timeframe} timeframe.
          </p>
        </div>

        {/* Price Targets */}
        {(decision.targetPrice || decision.stopLoss) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">Current Price</span>
              </div>
              <p className="text-white font-bold text-lg">{formatPrice(currentPrice)}</p>
            </div>
            
            {decision.targetPrice && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-green-400" size={16} />
                  <span className="text-gray-400 text-sm">Target Price</span>
                </div>
                <p className="text-green-400 font-bold text-lg">{formatPrice(decision.targetPrice)}</p>
                <p className="text-xs text-gray-400">
                  {((decision.targetPrice - currentPrice) / currentPrice * 100).toFixed(1)}% upside
                </p>
              </div>
            )}
            
            {decision.stopLoss && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-red-400" size={16} />
                  <span className="text-gray-400 text-sm">Stop Loss</span>
                </div>
                <p className="text-red-400 font-bold text-lg">{formatPrice(decision.stopLoss)}</p>
                <p className="text-xs text-gray-400">
                  {((decision.stopLoss - currentPrice) / currentPrice * 100).toFixed(1)}% risk
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reasoning */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-3">Analysis Summary</h4>
          <ul className="space-y-2">
            {decision.reasoning.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Warning */}
        <div className="bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-yellow-400" size={16} />
            <h4 className="text-yellow-400 font-semibold">Risk Disclaimer</h4>
          </div>
          <p className="text-gray-300 text-sm">
            This analysis is for educational purposes only. Always conduct your own research and consider your risk tolerance before making investment decisions. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingDecision;