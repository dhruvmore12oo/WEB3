import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const PriceCard = ({ coin, data, delay = 0 }) => {
  const change = data?.usd_24h_change || 0;
  const price = data?.usd || 0;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none transition-all group-hover:opacity-40 ${isPositive ? 'bg-success' : 'bg-danger'}`} />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center p-2 border border-white/10 relative overflow-hidden">
            <img 
              src={`https://assets.coingecko.com/coins/images/${coin.imageId}/standard/${coin.imageName}?1696501400`} 
              alt={coin.name}
              className="w-full h-full object-contain absolute inset-0 z-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl absolute inset-0 z-0">
              {coin.symbol.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{coin.name}</h3>
            <span className="text-sm font-medium text-gray-500 uppercase">{coin.symbol}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center text-3xl font-bold text-white tracking-tight">
          <DollarSign className="w-6 h-6 text-gray-400 mr-1" />
          {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
        </div>
        
        <div className={`flex items-center gap-1.5 font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change).toFixed(2)}%
          <span className="text-gray-500 text-sm ml-1">(24h)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
