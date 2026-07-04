import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Info, Lightbulb, ExternalLink } from 'lucide-react';

const ConceptDetailCard = ({ concept }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      id={concept.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-border overflow-hidden scroll-mt-28"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary mb-4 tracking-tight">
            {concept.title}
          </h2>
          <p className="text-base md:text-lg text-muted font-medium leading-relaxed max-w-3xl">
            {concept.intro}
          </p>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Left Side Header */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-border relative overflow-hidden">
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[30px] opacity-20 ${concept.left.bgClass}`} />
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-white ${concept.left.textClass} ${concept.left.borderClass}`}>
                <concept.left.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-secondary">{concept.left.name}</h3>
            </div>
            
            {/* Examples Badge */}
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-2">Examples</span>
              <div className="flex flex-wrap gap-2">
                {concept.examples.left.map((ex, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white border border-border rounded text-xs font-semibold text-secondary shadow-sm">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Header */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[30px] opacity-20 bg-primary" />
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm bg-white text-primary border-primary/30">
                <concept.right.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-secondary">{concept.right.name}</h3>
            </div>
            
            {/* Examples Badge */}
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 block mb-2">Examples</span>
              <div className="flex flex-wrap gap-2">
                {concept.examples.right.map((ex, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white border border-primary/20 rounded text-xs font-semibold text-primary shadow-sm">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table Container */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 border-b border-border p-4 text-xs font-bold uppercase tracking-wider text-muted hidden md:grid">
            <div className="col-span-3">Attribute</div>
            <div className="col-span-4 pl-4">{concept.left.name}</div>
            <div className="col-span-1 flex justify-center"></div>
            <div className="col-span-4 text-primary pl-4">{concept.right.name}</div>
          </div>

          <div className="divide-y divide-border">
            {concept.attributes.slice(0, isExpanded ? undefined : 5).map((attr, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 items-center hover:bg-gray-50/50 transition-colors gap-3 md:gap-0">
                <div className="col-span-12 md:col-span-3 font-bold text-secondary flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan block md:hidden"></span>
                  {attr.name}
                </div>
                
                <div className="col-span-12 md:col-span-4 md:pl-4 text-muted font-medium text-sm">
                  <div className="md:hidden text-[10px] font-bold uppercase text-gray-400 mb-1">{concept.left.name}</div>
                  {attr.left}
                </div>

                <div className="hidden md:flex col-span-1 justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                    VS
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 md:pl-4 text-secondary font-semibold text-sm">
                  <div className="md:hidden text-[10px] font-bold uppercase text-primary/80 mb-1">{concept.right.name}</div>
                  {attr.right}
                </div>
              </div>
            ))}
          </div>

          {concept.attributes.length > 5 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-3 bg-gray-50 hover:bg-gray-100 text-secondary font-bold text-sm flex items-center justify-center gap-2 border-t border-border transition-colors"
            >
              {isExpanded ? 'Show Less' : `View All ${concept.attributes.length} Comparisons`}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}
        </div>

        {/* Footer info: Takeaways & Did you know */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-primary/5 rounded-2xl p-6 border border-primary/20 relative">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-bold text-secondary">Key Takeaways</h4>
            </div>
            <ul className="space-y-3">
              {concept.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted font-medium leading-relaxed text-sm">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cyan/10 rounded-2xl p-6 border border-cyan/30 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-cyan flex items-center justify-center text-white shadow-sm">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-secondary">Did You Know?</h4>
            </div>
            <p className="text-secondary font-semibold leading-relaxed text-sm">
              {concept.didYouKnow}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ConceptDetailCard;
