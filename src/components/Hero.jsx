import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Shield, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden flex flex-col items-center">
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[15%] w-24 h-24 bg-primary/10 rounded-[30px] rotate-12 backdrop-blur-3xl border border-primary/20 hidden lg:flex items-center justify-center"
      >
        <Sparkles className="text-primary w-10 h-10" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 right-[15%] w-32 h-32 bg-secondary/5 rounded-full backdrop-blur-3xl border border-secondary/10 hidden lg:flex items-center justify-center"
      >
        <Activity className="text-secondary w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-10 text-sm font-semibold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            Next Generation Web3 Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-secondary leading-[1.1]">
            Learn Web3 Through <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              Interactive Experiences
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the future of the internet. Explore blockchain fundamentals, Layer 2 scaling solutions, and live market data in one unified, beautifully designed platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link to="/concepts" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(249,115,22,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Explore Concepts <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/prices" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4 bg-white border border-border hover:border-secondary/30 text-secondary rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2">
                Live Prices <Activity className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
