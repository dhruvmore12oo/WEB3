import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Link2, Link2Off, Loader2 } from 'lucide-react';

const Block = ({ block, index, onDataChange, onMine, isConnected, isMining }) => {
  const isValid = block.hash.startsWith('00');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white rounded-[40px] p-8 md:p-10 w-full max-w-lg border-2 transition-all duration-300 relative shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] ${
        isValid ? 'border-success/30' : 'border-danger/30'
      }`}
    >
      <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
        <h3 className="text-3xl font-extrabold text-secondary flex items-center gap-3">
          Block <span className="text-primary">#{index + 1}</span>
        </h3>
        {isValid ? (
          <span className="flex items-center gap-2 text-success font-bold text-sm bg-success/10 px-4 py-2 rounded-full border border-success/20 shadow-sm">
            <CheckCircle2 className="w-5 h-5" /> Valid
          </span>
        ) : (
          <span className="flex items-center gap-2 text-danger font-bold text-sm bg-danger/10 px-4 py-2 rounded-full border border-danger/20 shadow-sm">
            <XCircle className="w-5 h-5" /> Invalid
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wider">Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(index, e.target.value)}
            className="w-full bg-gray-50 border border-border rounded-[20px] p-5 text-secondary font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none h-32 text-lg shadow-inner"
            placeholder="Enter block data..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wider">Previous Hash</label>
          <div className="w-full bg-gray-100 border border-border rounded-[20px] p-4 text-gray-500 font-mono text-sm break-all flex items-center justify-between shadow-inner">
             <span>{block.previousHash || '0'.repeat(64)}</span>
             {index > 0 && (
               isConnected 
                 ? <Link2 className="w-5 h-5 text-success flex-shrink-0 ml-3" /> 
                 : <Link2Off className="w-5 h-5 text-danger flex-shrink-0 ml-3" />
             )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wider">Nonce</label>
            <div className="w-full bg-primary/5 border border-primary/20 rounded-[20px] p-4 text-primary font-mono text-lg font-bold shadow-inner text-center">
              {block.nonce}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wider">&nbsp;</label>
            <button
              onClick={() => onMine(index)}
              disabled={isValid || isMining}
              className={`w-full py-4 rounded-[20px] font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                isValid
                  ? 'bg-success/10 text-success cursor-not-allowed border border-success/20'
                  : 'bg-primary hover:bg-orange-600 text-white shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(249,115,22,0.6)] hover:-translate-y-1'
              }`}
            >
              {isMining ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Mining...
                </>
              ) : isValid ? (
                'Mined'
              ) : (
                'Mine Block'
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-muted mb-2 uppercase tracking-wider">Hash</label>
          <div className={`w-full bg-gray-100 border-2 rounded-[20px] p-4 font-mono text-sm break-all transition-colors shadow-inner ${
            isValid ? 'border-success/30 text-success font-semibold' : 'border-danger/30 text-danger font-semibold'
          }`}>
            {block.hash}
          </div>
        </div>
      </div>
      
      {/* Visual connector between blocks */}
      {index < 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-24 w-24 h-1 bg-border z-[-1]">
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm ${isConnected !== false ? 'bg-success' : 'bg-danger'}`} />
        </div>
      )}
    </motion.div>
  );
};

export default Block;
