import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import SearchBar from './components/SearchBar';
import StockOverview from './components/StockOverview';
import TechnicalIndicators from './components/TechnicalIndicators';
import CandlestickChart from './components/CandlestickChart';
import PatternAnalysis from './components/PatternAnalysis';
import TradingDecision from './components/TradingDecision';
import { 
  mockStockData, 
  mockTechnicalIndicators, 
  mockPatternAnalysis, 
  generateCandlestickData,
  generateTradingDecision 
} from './data/mockData';

function App() {
  const [currentSymbol, setCurrentSymbol] = useState('AAPL');
  const [candlestickData, setCandlestickData] = useState(generateCandlestickData('AAPL'));
  const [tradingDecision, setTradingDecision] = useState(generateTradingDecision('AAPL'));

  const handleSearch = (symbol: string) => {
    if (mockStockData[symbol]) {
      setCurrentSymbol(symbol);
      setCandlestickData(generateCandlestickData(symbol));
      setTradingDecision(generateTradingDecision(symbol));
    } else {
      alert(`${symbol} not found. Available symbols: AAPL, TSLA, BTC, ETH`);
    }
  };

  const currentStock = mockStockData[currentSymbol];
  const currentIndicators = mockTechnicalIndicators[currentSymbol];
  const currentPattern = mockPatternAnalysis[currentSymbol];

  if (!currentStock || !currentIndicators || !currentPattern) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Stock Analysis App</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-white">TradingIQ</h1>
              <p className="text-gray-400 text-sm">Advanced Stock & Crypto Analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} currentSymbol={currentSymbol} />
          
          {/* Stock Overview */}
          <StockOverview stock={currentStock} />
          
          {/* Charts and Analysis Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Candlestick Chart */}
            <div className="xl:col-span-2">
              <CandlestickChart data={candlestickData} symbol={currentSymbol} />
            </div>
            
            {/* Technical Indicators */}
            <TechnicalIndicators indicators={currentIndicators} />
            
            {/* Pattern Analysis */}
            <PatternAnalysis pattern={currentPattern} />
          </div>
          
          {/* Trading Decision */}
          <TradingDecision decision={tradingDecision} currentPrice={currentStock.price} />
          
          {/* Educational Footer */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">How to Use This Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Technical Indicators</h4>
                <p>RSI above 70 = overbought, below 30 = oversold. MACD histogram shows momentum direction. Moving averages indicate trend strength.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Candlestick Patterns</h4>
                <p>Patterns help predict price direction. Bullish patterns suggest upward movement, bearish patterns suggest downward movement.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Trading Decisions</h4>
                <p>Combine multiple indicators for better accuracy. Always use stop losses and consider your risk tolerance before trading.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;