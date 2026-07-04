import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Link2, Link2Off, Loader2 } from 'lucide-react';

const Block = ({ block, index, onDataChange, onMine, isConnected, isMining, orderClass }) => {
  const isValid = block.hash.startsWith('00');

  // Determine desktop connector directions based on index
  // 0 -> 1 (right)
  // 1 -> 2 (right)
  // 2 -> 3 (down)
  // 3 -> 4 (left)
  // 4 -> 5 (left)
  const isRightConnector = index === 0 || index === 1;
  const isDownConnector = index === 2;
  const isLeftConnector = index === 3 || index === 4;
  const hasDesktopConnector = index < 5;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-3xl p-6 md:p-8 w-full max-w-md border-2 transition-all duration-300 relative shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] ${orderClass} ${
        isValid ? 'border-success/30' : 'border-danger/30'
      }`}
    >
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h3 className="text-2xl font-extrabold text-secondary flex items-center gap-2">
          Block <span className="text-primary">#{index + 1}</span>
        </h3>
        {isValid ? (
          <span className="flex items-center gap-1.5 text-success font-bold text-xs bg-success/10 px-3 py-1.5 rounded-full border border-success/20 shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Valid
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-danger font-bold text-xs bg-danger/10 px-3 py-1.5 rounded-full border border-danger/20 shadow-sm">
            <XCircle className="w-4 h-4" /> Invalid
          </span>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-muted mb-2 uppercase tracking-wider">Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(index, e.target.value)}
            className="w-full bg-gray-50 border border-border rounded-xl p-4 text-secondary font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none h-24 text-base shadow-inner"
            placeholder="Enter block data..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-muted mb-2 uppercase tracking-wider">Previous Hash</label>
          <div className={`w-full bg-gray-100 border border-border rounded-xl p-3 text-gray-500 font-mono text-[10px] sm:text-xs break-all flex items-center justify-between shadow-inner ${!isConnected && index > 0 ? 'border-danger/50 bg-danger/5 text-danger' : ''}`}>
             <span>{block.previousHash || '0'.repeat(64)}</span>
             {index > 0 && (
               isConnected 
                 ? <Link2 className="w-4 h-4 text-success flex-shrink-0 ml-2" /> 
                 : <Link2Off className="w-4 h-4 text-danger flex-shrink-0 ml-2" />
             )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-muted mb-2 uppercase tracking-wider">Nonce</label>
            <div className="w-full bg-primary/5 border border-primary/20 rounded-xl p-3 text-primary font-mono text-base font-bold shadow-inner text-center">
              {block.nonce}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted mb-2 uppercase tracking-wider">&nbsp;</label>
            <button
              onClick={() => onMine(index)}
              disabled={isValid || isMining}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isValid
                  ? 'bg-success/10 text-success cursor-not-allowed border border-success/20'
                  : 'bg-primary hover:bg-orange-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {isMining ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Mining...
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
          <label className="block text-xs font-bold text-muted mb-2 uppercase tracking-wider">Hash</label>
          <div className={`w-full bg-gray-100 border-2 rounded-xl p-3 font-mono text-[10px] sm:text-xs break-all transition-colors shadow-inner ${
            isValid ? 'border-success/30 text-success font-semibold' : 'border-danger/30 text-danger font-semibold'
          }`}>
            {block.hash}
          </div>
        </div>
      </div>
      
      {/* Visual Connectors */}
      {index < 5 && (
        <>
          {/* Mobile Connector (always down) */}
          <div className="lg:hidden flex justify-center w-full my-4 relative">
            <div className={`w-1 h-8 ${isValid ? 'bg-success' : 'bg-danger'} transition-colors`} />
            <div className={`absolute bottom-[-4px] w-3 h-3 rounded-full border-2 border-white shadow-sm ${isValid ? 'bg-success' : 'bg-danger'}`} />
          </div>

          {/* Desktop Connectors */}
          <div className="hidden lg:block">
            {isRightConnector && (
              <div className="absolute top-1/2 -right-16 w-16 h-1 z-[-1] flex items-center justify-end">
                <div className={`w-full h-full ${isValid ? 'bg-success' : 'bg-danger'} transition-colors relative`}>
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${isValid ? 'bg-success' : 'bg-danger'}`} />
                </div>
              </div>
            )}
            {isLeftConnector && (
              <div className="absolute top-1/2 -left-16 w-16 h-1 z-[-1] flex items-center justify-start">
                <div className={`w-full h-full ${isValid ? 'bg-success' : 'bg-danger'} transition-colors relative`}>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${isValid ? 'bg-success' : 'bg-danger'}`} />
                </div>
              </div>
            )}
            {isDownConnector && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-1 h-16 z-[-1] flex items-end justify-center">
                <div className={`w-full h-full ${isValid ? 'bg-success' : 'bg-danger'} transition-colors relative`}>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${isValid ? 'bg-success' : 'bg-danger'}`} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Block;
