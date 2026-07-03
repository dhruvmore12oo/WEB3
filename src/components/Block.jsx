import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Link2, Link2Off } from 'lucide-react';

const Block = ({ block, index, onDataChange, onMine, isConnected }) => {
  const isValid = block.hash.startsWith('00');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass rounded-2xl p-6 w-full max-w-md border-2 transition-colors duration-300 relative ${
        isValid ? 'border-success/50 bg-success/5' : 'border-danger/50 bg-danger/5'
      }`}
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Block #{index + 1}
        </h3>
        {isValid ? (
          <span className="flex items-center gap-1.5 text-success font-medium text-sm bg-success/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4" /> Valid
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-danger font-medium text-sm bg-danger/10 px-3 py-1 rounded-full">
            <XCircle className="w-4 h-4" /> Invalid
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(index, e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none h-24 font-mono text-sm"
            placeholder="Enter block data..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Previous Hash</label>
          <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-gray-500 font-mono text-xs break-all flex items-center justify-between">
             {block.previousHash || '0'.repeat(64)}
             {index > 0 && (
               isConnected ? <Link2 className="w-4 h-4 text-success flex-shrink-0 ml-2" /> : <Link2Off className="w-4 h-4 text-danger flex-shrink-0 ml-2" />
             )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Nonce</label>
            <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono text-sm">
              {block.nonce}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">&nbsp;</label>
            <button
              onClick={() => onMine(index)}
              disabled={isValid}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isValid
                  ? 'bg-success/20 text-success cursor-not-allowed border border-success/30'
                  : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
              }`}
            >
              {isValid ? 'Mined' : 'Mine'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Hash</label>
          <div className={`w-full bg-black/40 border rounded-xl p-3 font-mono text-xs break-all transition-colors ${
            isValid ? 'border-success/30 text-success' : 'border-danger/30 text-danger'
          }`}>
            {block.hash}
          </div>
        </div>
      </div>
      
      {/* Visual connector between blocks */}
      {index < 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-12 w-12 h-0.5 bg-white/20">
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${isConnected !== false ? 'bg-success' : 'bg-danger'}`} />
        </div>
      )}
    </motion.div>
  );
};

export default Block;
