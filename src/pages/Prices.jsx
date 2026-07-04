import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Search, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">Live Crypto Dashboard</h1>
            <p className="text-gray-400">Track real-time prices for top Web3 assets.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              {lastUpdated && (
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button 
                onClick={loadPrices}
                disabled={loading}
                className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-xl transition-colors border border-primary/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>

        {error && (
          <div className="glass bg-danger/10 border-danger/30 text-danger p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && !prices ? (
            // Skeleton loading
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="glass p-6 rounded-2xl animate-pulse">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                  <div className="space-y-2">
                    <div className="w-24 h-5 bg-white/10 rounded" />
                    <div className="w-12 h-4 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-32 h-8 bg-white/10 rounded" />
                  <div className="w-16 h-5 bg-white/10 rounded" />
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
            <div className="col-span-full text-center py-12 text-gray-500">
              No assets found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prices;
