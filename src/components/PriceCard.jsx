import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const PriceCard = ({ coin, data, delay = 0 }) => {
  const change = data?.usd_24h_change || 0;
  const price = data?.usd || 0;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white p-8 rounded-[30px] border border-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group transition-all duration-300"
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none transition-all group-hover:opacity-40 group-hover:scale-110 ${isPositive ? 'bg-success' : 'bg-danger'}`} />
      
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center p-2 border border-border relative overflow-hidden group-hover:border-primary/20 transition-colors">
            <img 
              src={`https://assets.coingecko.com/coins/images/${coin.imageId}/standard/${coin.imageName}?1696501400`} 
              alt={coin.name}
              className="w-full h-full object-contain absolute inset-0 z-10 p-2"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl absolute inset-0 z-0">
              {coin.symbol.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary">{coin.name}</h3>
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">{coin.symbol}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-4xl font-extrabold text-secondary tracking-tight">
          <DollarSign className="w-7 h-7 text-gray-400 mr-1" />
          {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
        </div>
        
        <div className={`inline-flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change).toFixed(2)}%
          <span className="text-current/60 text-xs ml-1 uppercase">(24h)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
