import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white p-6 rounded-2xl border border-border shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start group"
    >
      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-5 text-cyan group-hover:scale-110 group-hover:bg-cyan group-hover:text-white transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
      <p className="text-muted leading-relaxed font-medium text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
