import React from 'react';
import { motion } from 'framer-motion';

const ComparisonSide = ({ title, icon: Icon, points, illustration: Illustration, isRight }) => (
  <div className={`p-8 w-full md:w-1/2 flex flex-col ${isRight ? 'bg-white/[0.02]' : ''}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-xl ${isRight ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-400">
          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isRight ? 'bg-secondary' : 'bg-primary'}`} />
          <span>{point}</span>
        </li>
      ))}
    </ul>
    <div className="flex justify-center mt-auto opacity-80">
      <Illustration className={`w-24 h-24 ${isRight ? 'text-secondary' : 'text-primary'}`} />
    </div>
  </div>
);

const ComparisonCard = ({ left, right, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="glass rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <ComparisonSide {...left} isRight={false} />
      <div className="hidden md:block w-[1px] bg-white/10" />
      <div className="md:hidden h-[1px] w-full bg-white/10" />
      <ComparisonSide {...right} isRight={true} />
    </motion.div>
  );
};

export default ComparisonCard;
