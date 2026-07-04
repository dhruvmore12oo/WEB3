import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 mt-20 relative bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-bold text-secondary mb-2">Web3Learn</h3>
        <p className="text-muted font-medium mb-6">Master the foundational technologies of the future.</p>
        <div className="flex justify-center items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all">
            <Globe className="w-5 h-5" />
          </a>
        </div>
        <p className="text-gray-400 text-sm mt-8 font-medium">© {new Date().getFullYear()} Web3Learn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
