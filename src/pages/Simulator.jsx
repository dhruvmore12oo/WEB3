import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ShieldAlert, Cpu } from 'lucide-react';
import Block from '../components/Block';
import { calculateHash } from '../utils/hash';

const INITIAL_BLOCKS = [
  { data: 'Alice sends 10 ETH to Bob', nonce: 0, hash: '', previousHash: '0000000000000000000000000000000000000000000000000000000000000000' },
  { data: 'Bob sends 5 ETH to Charlie', nonce: 0, hash: '', previousHash: '' }
];

const Simulator = () => {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [isMining, setIsMining] = useState(false);
  const [miningIndex, setMiningIndex] = useState(null);

  useEffect(() => {
    // Initial hash calculation without mining
    const initHashes = async () => {
      const newBlocks = [...blocks];
      for (let i = 0; i < newBlocks.length; i++) {
        const block = newBlocks[i];
        if (i > 0) {
          block.previousHash = newBlocks[i-1].hash;
        }
        block.hash = await calculateHash(block.previousHash + block.data + block.nonce);
      }
      setBlocks(newBlocks);
    };
    if (blocks[0].hash === '') {
      initHashes();
    }
  }, []);

  const handleDataChange = async (index, newData) => {
    const newBlocks = [...blocks];
    newBlocks[index].data = newData;
    
    // Recalculate hash for changed block and subsequent blocks
    for (let i = index; i < newBlocks.length; i++) {
      if (i > 0) {
        newBlocks[i].previousHash = newBlocks[i-1].hash;
      }
      newBlocks[i].hash = await calculateHash(newBlocks[i].previousHash + newBlocks[i].data + newBlocks[i].nonce);
    }
    setBlocks(newBlocks);
  };

  const mineBlock = async (index) => {
    setIsMining(true);
    setMiningIndex(index);
    
    const newBlocks = [...blocks];
    let block = newBlocks[index];
    let nonce = 0;
    let hash = '';
    
    // Simulate mining by finding a hash that starts with '00'
    // To prevent blocking UI completely, we yield to the event loop occasionally
    const mine = async () => {
      let attempts = 0;
      while (attempts < 1000) {
        hash = await calculateHash(block.previousHash + block.data + nonce);
        if (hash.startsWith('00')) {
          block.nonce = nonce;
          block.hash = hash;
          
          // Update subsequent block's previous hash
          if (index + 1 < newBlocks.length) {
            newBlocks[index + 1].previousHash = hash;
            newBlocks[index + 1].hash = await calculateHash(hash + newBlocks[index + 1].data + newBlocks[index + 1].nonce);
          }
          
          setBlocks(newBlocks);
          setIsMining(false);
          setMiningIndex(null);
          return;
        }
        nonce++;
        attempts++;
      }
      
      // Update UI with progress and continue
      block.nonce = nonce;
      block.hash = hash;
      setBlocks([...newBlocks]);
      
      // Yield to event loop then continue mining
      setTimeout(mine, 0);
    };
    
    mine();
  };

  const resetChain = async () => {
    setBlocks(JSON.parse(JSON.stringify(INITIAL_BLOCKS)));
    // The useEffect will catch the empty hash and recalculate
  };

  const isChainBroken = blocks.length > 1 && blocks[1].previousHash !== blocks[0].hash;

  return (
    <div className="min-h-screen pt-40 pb-32 bg-background relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-[20px] bg-white border border-border shadow-sm text-primary mb-8">
            <Cpu className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-secondary tracking-tight">Blockchain <span className="text-primary">Simulator</span></h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Interact with a live cryptographic hash function. See how blocks connect to form an immutable chain.
          </p>
          <button 
            onClick={resetChain}
            className="flex items-center gap-2 mx-auto px-8 py-3 bg-white border border-border hover:border-secondary/30 shadow-sm hover:shadow-md rounded-full text-secondary font-bold transition-all hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Chain
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center items-center relative">
          
          {blocks.map((block, index) => (
            <Block 
              key={index}
              block={block}
              index={index}
              onDataChange={handleDataChange}
              onMine={mineBlock}
              isConnected={index === 0 || blocks[index].previousHash === blocks[index - 1].hash}
              isMining={isMining && miningIndex === index}
            />
          ))}

        </div>

        {isChainBroken && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 mx-auto max-w-2xl bg-danger/10 border border-danger/30 p-8 rounded-[30px] flex items-start gap-5 text-danger shadow-[0_10px_40px_-10px_rgba(239,68,68,0.2)]"
          >
            <div className="bg-white p-3 rounded-2xl shadow-sm shrink-0">
              <ShieldAlert className="w-8 h-8 text-danger" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3">Chain Broken!</h4>
              <p className="text-lg font-medium opacity-90 leading-relaxed">
                You modified the data in Block #1, which changed its hash. Block #2 is now invalid because its "Previous Hash" no longer matches Block #1. This is how immutability works!
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-[30px] border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-secondary mb-4">The Nonce</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">A "number only used once." Miners repeatedly change this number and recalculate the hash until they find a hash that starts with specific characters (like '00').</p>
          </div>
          <div className="bg-white p-8 rounded-[30px] border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-secondary mb-4">The Hash</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">A digital fingerprint of the data. Even a tiny change to the block's data completely changes the resulting SHA-256 hash output.</p>
          </div>
          <div className="bg-white p-8 rounded-[30px] border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-secondary mb-4">Chain Integrity</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">Each block contains the hash of the previous block. If past data is altered, all subsequent blocks become invalid instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
