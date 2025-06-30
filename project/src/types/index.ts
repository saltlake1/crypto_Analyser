export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    signal: number;
    histogram: number;
    macd: number;
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  stochastic: {
    k: number;
    d: number;
  };
}

export interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PatternAnalysis {
  pattern: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  description: string;
  tradingAdvice: string;
}

export interface TradingDecision {
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reasoning: string[];
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
}