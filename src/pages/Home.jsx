import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Network, Zap, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Network} 
              title="Decentralization" 
              description="Discover how distributed networks eliminate single points of failure and put users back in control of their own data and assets."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap} 
              title="Layer 2 Scaling" 
              description="Learn about rollups and sidechains that process transactions off the main Ethereum chain, drastically reducing fees."
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-primary/10 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Why Ethereum Needed <span className="text-primary">Layer 2</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg">
                <p>
                  As Ethereum grew in popularity, its foundational Layer 1 faced severe challenges. The network could only process about 15 transactions per second, leading to massive <strong>network congestion</strong>.
                </p>
                <p>
                  During peak times, users faced exorbitant <strong>high gas fees</strong>, sometimes costing hundreds of dollars just to perform a simple token swap or mint an NFT. It became clear that Ethereum needed a way to scale without sacrificing its core security.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="glass p-8 rounded-3xl border border-white/10 relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-[20px]" />
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">The Arbitrum Solution</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Optimistic Rollups", desc: "Batches thousands of transactions off-chain before submitting them to Ethereum." },
                    { title: "EVM Compatibility", desc: "Developers can deploy existing Ethereum smart contracts without rewriting code." },
                    { title: "Real-world Advantages", desc: "Enables complex DeFi applications and Web3 games that were previously impossible." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
      <section className="py-24 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Experience the Benefits</h2>
            <p className="text-gray-400 text-lg">Layer 2 networks combine the best of both worlds: performance and security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Lower Fees", value: "Up to 100x", desc: "cheaper than Ethereum L1", color: "from-blue-500 to-cyan-500" },
              { title: "Fast Confirmation", value: "~0.25s", desc: "block time on Arbitrum One", color: "from-purple-500 to-pink-500" },
              { title: "Ethereum Security", value: "100%", desc: "anchored to Ethereum's security", color: "from-green-500 to-emerald-500" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/5 text-center group hover:bg-white/[0.02] transition-colors"
              >
                <h3 className="text-xl font-medium text-gray-400 mb-4">{stat.title}</h3>
                <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3`}>
                  {stat.value}
                </div>
                <p className="text-gray-500">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
