import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Search, AlertCircle, Activity } from 'lucide-react';
import PriceCard from '../components/PriceCard';
import { fetchCryptoPrices } from '../utils/api';

const COINS_INFO = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', imageId: '1', imageName: 'bitcoin.png' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', imageId: '279', imageName: 'ethereum.png' },
  { id: 'arbitrum', symbol: 'arb', name: 'Arbitrum', imageId: '28206', imageName: 'arbitrum.png' },
  { id: 'polygon-ecosystem-token', symbol: 'pol', name: 'Polygon', imageId: '4713', imageName: 'matic-token-icon.png' },
  { id: 'solana', symbol: 'sol', name: 'Solana', imageId: '4128', imageName: 'solana.png' }
];

const Prices = () => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Track ongoing request internally within loadPrices
  const [isFetching, setIsFetching] = useState(false);

  const loadPrices = useCallback(async (signal = null) => {
    // Only use the signal if it's explicitly an AbortSignal to avoid MouseEvent crashes
    const validSignal = signal instanceof AbortSignal ? signal : null;
    
    setIsFetching(true);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoPrices(validSignal);
      if (data) {
        setPrices(data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch live prices. Please try again later.');
      }
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    loadPrices(controller.signal);
    
    const interval = setInterval(() => {
      loadPrices();
    }, 60000); // Refresh every minute
    
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [loadPrices]);

  const filteredCoins = COINS_INFO.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-40 pb-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 text-sm font-semibold shadow-sm">
              <Activity className="w-4 h-4" /> Live Market Data
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight">Live <span className="text-primary">Dashboard</span></h1>
            <p className="text-muted font-medium text-lg">Track real-time prices for top Web3 assets.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto"
          >
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-border shadow-sm rounded-full py-3.5 pl-12 pr-6 text-secondary font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start">
              {lastUpdated && (
                <span className="text-xs text-muted font-medium whitespace-nowrap bg-white px-4 py-2 rounded-full border border-border shadow-sm">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button 
                onClick={loadPrices}
                disabled={loading}
                className="bg-primary hover:bg-orange-600 text-white p-3.5 rounded-full transition-all shadow-[0_4px_15px_-5px_rgba(249,115,22,0.5)] hover:shadow-[0_8px_20px_-5px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger p-5 rounded-[20px] mb-10 flex items-center gap-4 font-medium shadow-sm">
            <AlertCircle className="w-6 h-6" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && !prices ? (
            // Skeleton loading
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-border animate-pulse">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100" />
                  <div className="space-y-3 flex-1">
                    <div className="w-2/3 h-5 bg-gray-100 rounded-full" />
                    <div className="w-1/3 h-4 bg-gray-100 rounded-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-3/4 h-10 bg-gray-100 rounded-full" />
                  <div className="w-1/4 h-5 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            filteredCoins.map((coin, index) => {
              const coinData = prices?.[coin.id];
              if (!coinData) return null;
              
              return (
                <PriceCard 
                  key={coin.id}
                  coin={coin}
                  data={coinData}
                  delay={index * 0.1}
                />
              );
            })
          )}
          
          {!loading && filteredCoins.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-[30px] border border-border shadow-sm">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-muted font-medium">No assets found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prices;
