import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ShieldAlert, Cpu } from 'lucide-react';
import Block from '../components/Block';
import { calculateHash } from '../utils/hash';

const INITIAL_BLOCKS = [
  { data: 'Alice sends 10 ETH to Bob', nonce: 0, hash: '', previousHash: '0000000000000000000000000000000000000000000000000000000000000000' },
  { data: 'Bob sends 5 ETH to Charlie', nonce: 0, hash: '', previousHash: '' },
  { data: 'Charlie sends 2 ETH to Dave', nonce: 0, hash: '', previousHash: '' },
  { data: 'Dave sends 1 ETH to Eve', nonce: 0, hash: '', previousHash: '' },
  { data: 'Eve sends 0.5 ETH to Frank', nonce: 0, hash: '', previousHash: '' },
  { data: 'Frank sends 0.1 ETH to Grace', nonce: 0, hash: '', previousHash: '' }
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
  };

  // Check if any block (other than genesis) has a broken previous hash
  const brokenBlockIndex = blocks.findIndex((block, idx) => idx > 0 && block.previousHash !== blocks[idx - 1].hash);
  const isChainBroken = brokenBlockIndex !== -1;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white border border-border shadow-sm text-cyan mb-5">
            <Cpu className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-secondary tracking-tight">Blockchain <span className="text-primary">Simulator</span></h1>
          <p className="text-base md:text-lg text-muted font-medium leading-relaxed mb-8">
            Interact with a live cryptographic hash function. Modify any block's data to see how it invalidates the entire chain, forcing you to re-mine the blocks to restore trust.
          </p>
          <button 
            onClick={resetChain}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-white border border-border hover:border-cyan/50 hover:text-cyan shadow-sm hover:shadow-md rounded-full text-secondary font-bold text-sm transition-all hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Chain
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-20 lg:gap-x-16 justify-items-center relative mt-16">
          {blocks.map((block, index) => {
            const orderClasses = [
              'order-1 lg:order-1', // Index 0
              'order-2 lg:order-2', // Index 1
              'order-3 lg:order-3', // Index 2
              'order-4 lg:order-6', // Index 3
              'order-5 lg:order-5', // Index 4
              'order-6 lg:order-4', // Index 5
            ];

            return (
              <Block 
                key={index}
                block={block}
                index={index}
                onDataChange={handleDataChange}
                onMine={mineBlock}
                isConnected={index === 0 || blocks[index].previousHash === blocks[index - 1].hash}
                isMining={isMining && miningIndex === index}
                orderClass={orderClasses[index]}
              />
            )
          })}
        </div>

        {isChainBroken && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 mx-auto max-w-3xl bg-danger/10 border border-danger/30 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-5 text-danger shadow-sm text-center md:text-left"
          >
            <div className="bg-white p-3 rounded-2xl shadow-sm shrink-0">
              <ShieldAlert className="w-8 h-8 text-danger" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Chain Broken!</h4>
              <p className="text-base font-medium opacity-90 leading-relaxed">
                You modified the data in an earlier block, which changed its hash. Block #{brokenBlockIndex + 1} and subsequent blocks are now invalid because their "Previous Hash" references no longer match. Re-mine the invalid blocks to restore trust.
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-secondary mb-3">The Nonce</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">A "number only used once." Miners repeatedly change this number and recalculate the hash until they find a hash that starts with specific characters (like '00').</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-secondary mb-3">The Hash</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">A digital fingerprint of the data. Even a tiny change to the block's data completely changes the resulting SHA-256 hash output.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-secondary mb-3">Chain Integrity</h3>
            <p className="text-muted font-medium leading-relaxed text-sm">Each block contains the hash of the previous block. If past data is altered, all subsequent blocks become invalid instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
