import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  scrolled: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, setIsMenuOpen }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex-1 hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
          <a href="#collections" className="hover:opacity-50 transition-opacity">Collections</a>
          <a href="#atelier" className="hover:opacity-50 transition-opacity">L'Atelier</a>
        </div>

        <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase">Maison Étoile</h1>
        </div>

        <div className="flex-1 hidden md:flex items-center justify-end gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
          <a href="#blog" className="hover:opacity-50 transition-opacity">Journal</a>
          <button className="bg-black text-white px-6 py-2.5 hover:bg-neutral-800 transition-colors">RDV</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};
