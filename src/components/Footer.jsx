import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">My Name</h3>
        <p className="text-gray-400 mb-6">Batch: 2026</p>
        <div className="flex justify-center items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Globe className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-8">© {new Date().getFullYear()} Web3Learn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
