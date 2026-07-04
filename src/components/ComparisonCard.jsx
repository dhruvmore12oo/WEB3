import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonCard = ({ left, right, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col md:flex-row gap-6 md:gap-10 w-full group"
    >
      {/* Left Card - Traditional / Web2 */}
      <div className="flex-1 bg-white p-8 md:p-10 rounded-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-border relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300" />
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
            <left.icon className="w-7 h-7 text-gray-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-secondary">{left.title}</h3>
        </div>
        <ul className="space-y-5">
          {left.points.map((point, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <X className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <span className="text-muted font-medium text-lg leading-snug">{point}</span>
            </li>
          ))}
        </ul>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 rounded-full blur-[30px] -z-10" />
      </div>

      {/* VS Badge */}
      <div className="hidden md:flex flex-col justify-center items-center -mx-5 z-10">
        <div className="w-14 h-14 bg-white border border-border rounded-full shadow-lg flex items-center justify-center font-black text-xl text-muted bg-clip-padding backdrop-filter backdrop-blur-xl">
          VS
        </div>
      </div>

      {/* Right Card - Modern / Web3 */}
      <div className="flex-1 bg-white p-8 md:p-10 rounded-[40px] shadow-[0_15px_50px_-15px_rgba(249,115,22,0.15)] border border-primary/20 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(249,115,22,0.25)]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400" />
        <div className="flex items-center gap-4 mb-8 border-b border-primary/10 pb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <right.icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-3xl font-extrabold text-secondary">{right.title}</h3>
        </div>
        <ul className="space-y-5">
          {right.points.map((point, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-secondary font-semibold text-lg leading-snug">{point}</span>
            </li>
          ))}
        </ul>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[30px] -z-10" />
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
