import { StockData, TechnicalIndicators, CandlestickData, PatternAnalysis, TradingDecision } from '../types';

export const mockStockData: Record<string, StockData> = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 193.42,
    change: 2.83,
    changePercent: 1.48,
    volume: 45673200,
    marketCap: 2980000000000
  },
  'TSLA': {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.98,
    change: -5.22,
    changePercent: -2.05,
    volume: 89234500,
    marketCap: 792000000000
  },
  'BTC': {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.75,
    change: 1240.50,
    changePercent: 2.95,
    volume: 12450000000,
    marketCap: 847000000000
  },
  'ETH': {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2640.32,
    change: -89.23,
    changePercent: -3.27,
    volume: 8750000000,
    marketCap: 317000000000
  }
};

export const mockTechnicalIndicators: Record<string, TechnicalIndicators> = {
  'AAPL': {
    rsi: 58.4,
    macd: {
      signal: 1.23,
      histogram: 0.67,
      macd: 1.90
    },
    movingAverages: {
      sma20: 189.45,
      sma50: 185.67,
      sma200: 178.23,
      ema12: 191.23,
      ema26: 188.45
    },
    bollingerBands: {
      upper: 198.45,
      middle: 189.45,
      lower: 180.45
    },
    stochastic: {
      k: 62.3,
      d: 58.7
    }
  },
  'TSLA': {
    rsi: 34.2,
    macd: {
      signal: -2.45,
      histogram: -1.23,
      macd: -3.68
    },
    movingAverages: {
      sma20: 258.67,
      sma50: 265.23,
      sma200: 220.45,
      ema12: 252.34,
      ema26: 261.78
    },
    bollingerBands: {
      upper: 275.23,
      middle: 258.67,
      lower: 242.11
    },
    stochastic: {
      k: 28.9,
      d: 32.4
    }
  },
  'BTC': {
    rsi: 67.8,
    macd: {
      signal: 567.89,
      histogram: 234.56,
      macd: 802.45
    },
    movingAverages: {
      sma20: 42150.67,
      sma50: 40890.23,
      sma200: 38450.12,
      ema12: 42890.34,
      ema26: 41567.89
    },
    bollingerBands: {
      upper: 45890.23,
      middle: 42150.67,
      lower: 38411.11
    },
    stochastic: {
      k: 72.4,
      d: 69.8
    }
  },
  'ETH': {
    rsi: 42.1,
    macd: {
      signal: -45.67,
      histogram: -23.45,
      macd: -69.12
    },
    movingAverages: {
      sma20: 2710.45,
      sma50: 2820.67,
      sma200: 2450.23,
      ema12: 2680.34,
      ema26: 2750.89
    },
    bollingerBands: {
      upper: 2890.45,
      middle: 2710.45,
      lower: 2530.45
    },
    stochastic: {
      k: 38.7,
      d: 41.2
    }
  }
};

export const generateCandlestickData = (symbol: string): CandlestickData[] => {
  const basePrice = mockStockData[symbol]?.price || 100;
  const data: CandlestickData[] = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const open = basePrice + (Math.random() - 0.5) * 20;
    const close = open + (Math.random() - 0.5) * 10;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
  }
  
  return data;
};

export const mockPatternAnalysis: Record<string, PatternAnalysis> = {
  'AAPL': {
    pattern: 'Ascending Triangle',
    type: 'bullish',
    confidence: 78,
    description: 'Price is forming higher lows while testing resistance at $195. This pattern typically breaks upward.',
    tradingAdvice: 'Wait for breakout above $195 with volume confirmation. Target: $205-210.'
  },
  'TSLA': {
    pattern: 'Head and Shoulders',
    type: 'bearish',
    confidence: 82,
    description: 'Classic reversal pattern with left shoulder at $280, head at $295, right shoulder at $275.',
    tradingAdvice: 'Pattern suggests downside to $230-235. Consider shorting on neckline break.'
  },
  'BTC': {
    pattern: 'Bull Flag',
    type: 'bullish',
    confidence: 85,
    description: 'Strong upward move followed by consolidation. Flag pole shows $8,000 gain.',
    tradingAdvice: 'Bullish continuation pattern. Target: $51,000-52,000 on breakout.'
  },
  'ETH': {
    pattern: 'Double Bottom',
    type: 'bullish',
    confidence: 71,
    description: 'Two lows at $2,580 level with higher high in between. Reversal pattern forming.',
    tradingAdvice: 'Watch for break above $2,750 for confirmation. Target: $2,950-3,000.'
  }
};

export const generateTradingDecision = (symbol: string): TradingDecision => {
  const indicators = mockTechnicalIndicators[symbol];
  const pattern = mockPatternAnalysis[symbol];
  const stock = mockStockData[symbol];
  
  if (!indicators || !pattern || !stock) {
    return {
      action: 'HOLD',
      confidence: 50,
      reasoning: ['Insufficient data'],
      timeframe: 'N/A'
    };
  }
  
  const reasoning: string[] = [];
  let bullishSignals = 0;
  let bearishSignals = 0;
  
  // RSI Analysis
  if (indicators.rsi > 70) {
    bearishSignals++;
    reasoning.push('RSI is overbought (>70)');
  } else if (indicators.rsi < 30) {
    bullishSignals++;
    reasoning.push('RSI is oversold (<30)');
  } else if (indicators.rsi > 50) {
    bullishSignals++;
    reasoning.push('RSI shows bullish momentum');
  } else {
    bearishSignals++;
    reasoning.push('RSI shows bearish momentum');
  }
  
  // MACD Analysis
  if (indicators.macd.histogram > 0) {
    bullishSignals++;
    reasoning.push('MACD histogram is positive');
  } else {
    bearishSignals++;
    reasoning.push('MACD histogram is negative');
  }
  
  // Moving Average Analysis
  if (stock.price > indicators.movingAverages.sma20) {
    bullishSignals++;
    reasoning.push('Price above 20-day SMA');
  } else {
    bearishSignals++;
    reasoning.push('Price below 20-day SMA');
  }
  
  // Pattern Analysis
  if (pattern.type === 'bullish') {
    bullishSignals++;
    reasoning.push(`Bullish pattern: ${pattern.pattern}`);
  } else if (pattern.type === 'bearish') {
    bearishSignals++;
    reasoning.push(`Bearish pattern: ${pattern.pattern}`);
  }
  
  // Bollinger Bands
  if (stock.price > indicators.bollingerBands.upper) {
    bearishSignals++;
    reasoning.push('Price above upper Bollinger Band (overbought)');
  } else if (stock.price < indicators.bollingerBands.lower) {
    bullishSignals++;
    reasoning.push('Price below lower Bollinger Band (oversold)');
  }
  
  let action: 'BUY' | 'SELL' | 'HOLD';
  let confidence: number;
  
  if (bullishSignals > bearishSignals + 1) {
    action = 'BUY';
    confidence = Math.min(95, 60 + (bullishSignals - bearishSignals) * 10);
  } else if (bearishSignals > bullishSignals + 1) {
    action = 'SELL';
    confidence = Math.min(95, 60 + (bearishSignals - bullishSignals) * 10);
  } else {
    action = 'HOLD';
    confidence = 50 + Math.abs(bullishSignals - bearishSignals) * 5;
  }
  
  return {
    action,
    confidence,
    reasoning,
    targetPrice: action === 'BUY' ? stock.price * 1.1 : action === 'SELL' ? stock.price * 0.9 : undefined,
    stopLoss: action === 'BUY' ? stock.price * 0.95 : action === 'SELL' ? stock.price * 1.05 : undefined,
    timeframe: '1-2 weeks'
  };
};