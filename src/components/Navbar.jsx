import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Concepts', path: '/concepts' },
  { name: 'Prices', path: '/prices' },
  { name: 'Simulator', path: '/simulator' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center p-3">
      <nav className={`transition-all duration-300 w-full max-w-6xl rounded-2xl flex justify-between items-center px-6 py-2 ${scrolled ? 'glass' : 'bg-transparent'}`}>
        <NavLink to="/" className="flex items-center">
          <img src="/logo.png" alt="Learn Blockchain" className="h-16 md:h-24 object-contain transition-all duration-300 scale-[1.5] origin-left" />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 bg-white/50 border border-border/50 backdrop-blur-md px-2 py-1.5 rounded-full">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted hover:text-secondary hover:bg-black/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-secondary p-2 bg-white/50 rounded-full" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 glass rounded-[30px] flex flex-col items-center py-6 gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-3 rounded-full text-lg font-semibold transition-colors w-11/12 text-center ${
                    isActive ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-secondary hover:bg-black/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
