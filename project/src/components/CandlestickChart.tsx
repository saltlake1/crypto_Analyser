import React from 'react';
import { CandlestickData } from '../types';
import { BarChart3 } from 'lucide-react';

interface CandlestickChartProps {
  data: CandlestickData[];
  symbol: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, symbol }) => {
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  const getY = (price: number) => {
    return ((maxPrice + padding - price) / (priceRange + 2 * padding)) * 280;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="text-blue-400" size={24} />
        {symbol} Price Chart (30D)
      </h2>
      
      <div className="relative bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <svg width="100%" height="320" className="min-w-[800px]">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = (i * 280) / 4;
            const price = maxPrice + padding - (i * (priceRange + 2 * padding)) / 4;
            return (
              <g key={i}>
                <line
                  x1="40"
                  y1={y + 20}
                  x2="760"
                  y2={y + 20}
                  stroke="#374151"
                  strokeWidth="0.5"
                  strokeDasharray="3,3"
                />
                <text
                  x="35"
                  y={y + 25}
                  fill="#9CA3AF"
                  fontSize="12"
                  textAnchor="end"
                >
                  {formatPrice(price)}
                </text>
              </g>
            );
          })}
          
          {/* Candlesticks */}
          {data.map((candle, index) => {
            const x = 60 + (index * 22);
            const openY = getY(candle.open) + 20;
            const closeY = getY(candle.close) + 20;
            const highY = getY(candle.high) + 20;
            const lowY = getY(candle.low) + 20;
            
            const isGreen = candle.close > candle.open;
            const bodyHeight = Math.abs(closeY - openY);
            const bodyTop = Math.min(openY, closeY);
            
            return (
              <g key={index}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={isGreen ? "#10B981" : "#EF4444"}
                  strokeWidth="1"
                />
                
                {/* Body */}
                <rect
                  x={x - 8}
                  y={bodyTop}
                  width="16"
                  height={Math.max(bodyHeight, 1)}
                  fill={isGreen ? "#10B981" : "#EF4444"}
                  stroke={isGreen ? "#10B981" : "#EF4444"}
                  strokeWidth="1"
                />
                
                {/* Date label (every 5th candle) */}
                {index % 5 === 0 && (
                  <text
                    x={x}
                    y="315"
                    fill="#9CA3AF"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {new Date(candle.date).getDate()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <span>Past 30 Days</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Bullish</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Bearish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;