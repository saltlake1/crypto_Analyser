import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { StockData } from '../types';

interface StockOverviewProps {
  stock: StockData;
}

const StockOverview: React.FC<StockOverviewProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;
  
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{stock.symbol}</h1>
          <p className="text-gray-400">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{formatNumber(stock.price)}</p>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{formatNumber(stock.change)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-blue-400" size={20} />
            <span className="text-gray-400 text-sm">Volume</span>
          </div>
          <p className="text-white font-bold text-lg">{formatNumber(stock.volume)}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-green-400" size={20} />
            <span className="text-gray-400 text-sm">Market Cap</span>
          </div>
          <p className="text-white font-bold text-lg">{formatNumber(stock.marketCap)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockOverview;