import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  currentSymbol: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, currentSymbol }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.toUpperCase());
      setInputValue('');
    }
  };

  const popularSymbols = ['AAPL', 'TSLA', 'BTC', 'ETH', 'GOOGL', 'MSFT', 'AMZN', 'NVDA'];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter stock symbol or crypto (e.g., AAPL, BTC)"
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Analyze
        </button>
      </form>
      
      {currentSymbol && (
        <div className="mb-4">
          <span className="text-sm text-gray-400">Currently analyzing: </span>
          <span className="text-white font-bold">{currentSymbol}</span>
        </div>
      )}
      
      <div>
        <p className="text-sm text-gray-400 mb-2">Popular symbols:</p>
        <div className="flex flex-wrap gap-2">
          {popularSymbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => onSearch(symbol)}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                symbol === currentSymbol
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;