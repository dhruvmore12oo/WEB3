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
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 text-primary mb-6">
            <Cpu className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Blockchain <span className="text-primary">Simulator</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Interact with a live cryptographic hash function. See how blocks connect to form an immutable chain.
          </p>
          <button 
            onClick={resetChain}
            className="flex items-center gap-2 mx-auto px-6 py-2 glass border border-white/10 hover:bg-white/5 rounded-xl text-white transition-colors"
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
            />
          ))}

        </div>

        {isChainBroken && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 mx-auto max-w-md bg-danger/10 border border-danger/30 p-6 rounded-2xl flex items-start gap-4 text-danger"
          >
            <ShieldAlert className="w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold mb-2">Chain Broken!</h4>
              <p className="text-sm opacity-90">
                You modified the data in Block #1, which changed its hash. Block #2 is now invalid because its "Previous Hash" no longer matches Block #1. This is how immutability works!
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">The Nonce</h3>
            <p className="text-gray-400 text-sm">A "number only used once." Miners repeatedly change this number and recalculate the hash until they find a hash that starts with specific characters (like '00').</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">The Hash</h3>
            <p className="text-gray-400 text-sm">A digital fingerprint of the data. Even a tiny change to the block's data completely changes the resulting SHA-256 hash output.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Chain Integrity</h3>
            <p className="text-gray-400 text-sm">Each block contains the hash of the previous block. If past data is altered, all subsequent blocks become invalid instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
