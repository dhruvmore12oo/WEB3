import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Shield, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center">
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[15%] w-16 h-16 bg-primary/10 rounded-2xl rotate-12 backdrop-blur-3xl border border-primary/20 hidden lg:flex items-center justify-center"
      >
        <Sparkles className="text-primary w-6 h-6" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-48 right-[15%] w-20 h-20 bg-cyan/10 rounded-full backdrop-blur-3xl border border-cyan/20 hidden lg:flex items-center justify-center"
      >
        <Activity className="text-cyan w-8 h-8" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/10 text-cyan mb-8 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            Next Generation Web3 Experience
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-secondary leading-[1.1]">
            Learn Web3 Through <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan">
              Interactive Experiences
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the future of the internet. Explore blockchain fundamentals, Layer 2 scaling solutions, and live market data in one unified platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link to="/concepts" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-7 py-3 text-sm bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-all shadow-[0_4px_14px_0_rgba(240,58,100,0.39)] hover:shadow-[0_6px_20px_rgba(240,58,100,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Explore Concepts <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/prices" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-7 py-3 text-sm bg-white border border-border hover:border-cyan/50 hover:text-cyan text-secondary rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Live Prices <Activity className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
