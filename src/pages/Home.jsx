import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Network, Zap, Shield, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 relative bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Network} 
              title="Decentralization" 
              description="Discover how distributed networks eliminate single points of failure and put users back in control of their own data and assets."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap} 
              title="Layer 2 Scaling" 
              description="Learn about rollups and sidechains that process transactions off the main chain, drastically reducing fees."
              delay={0.2}
            />
            <FeatureCard 
              icon={Shield} 
              title="Blockchain Security" 
              description="Understand the cryptographic principles that make blockchain networks virtually immutable and highly secure against attacks."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* About Arbitrum Section */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-cyan/5 blur-[80px] pointer-events-none rounded-3xl" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-secondary leading-tight">
                Why Ethereum Needed <br/> <span className="text-primary">Layer 2</span>
              </h2>
              <div className="space-y-5 text-muted text-base font-medium">
                <p>
                  As Ethereum grew in popularity, its foundational Layer 1 faced severe challenges. The network could only process about 15 transactions per second, leading to massive <strong className="text-secondary">network congestion</strong>.
                </p>
                <p>
                  During peak times, users faced exorbitant <strong className="text-secondary">high gas fees</strong>, sometimes costing hundreds of dollars just to perform a simple token swap or mint an NFT. It became clear that Ethereum needed a way to scale without sacrificing its core security.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="bg-white p-8 rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-border relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan/10 rounded-full blur-[15px]" />
                <h3 className="text-xl font-bold mb-6 text-secondary border-b border-border pb-4">The Arbitrum Solution</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Optimistic Rollups", desc: "Batches thousands of transactions off-chain before submitting them to Ethereum." },
                    { title: "EVM Compatibility", desc: "Developers can deploy existing Ethereum smart contracts without rewriting code." },
                    { title: "Real-world Advantages", desc: "Enables complex DeFi applications and Web3 games that were previously impossible." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-0.5 w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-cyan" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-secondary mb-1">{item.title}</h4>
                        <p className="text-muted text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative bg-white rounded-[30px] shadow-[0_-15px_30px_-20px_rgba(0,0,0,0.05)] mt-8 mx-4 mb-4 border border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-secondary">Experience the Benefits</h2>
            <p className="text-muted text-lg font-medium">Layer 2 networks combine the best of both worlds: extreme performance and battle-tested security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Lower Fees", value: "Up to 100x", desc: "cheaper than Ethereum L1", color: "from-primary to-pink-500" },
              { title: "Fast Confirmation", value: "~0.25s", desc: "block time on Arbitrum One", color: "from-cyan to-teal-400" },
              { title: "Ethereum Security", value: "100%", desc: "anchored to Ethereum's security", color: "from-blue-500 to-indigo-500" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-border text-center shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <h3 className="text-sm font-bold text-muted mb-4 uppercase tracking-wider">{stat.title}</h3>
                <div className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-4`}>
                  {stat.value}
                </div>
                <p className="text-muted font-medium text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
