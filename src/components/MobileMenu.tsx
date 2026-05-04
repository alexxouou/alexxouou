import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-12"
    >
      <button className="absolute top-8 right-6" onClick={onClose}>
        <X className="w-8 h-8" />
      </button>
      <div className="flex flex-col items-center gap-8 text-2xl font-serif uppercase tracking-[0.2em]">
        <a href="#collections" onClick={onClose}>Collections</a>
        <a href="#atelier" onClick={onClose}>L'Atelier</a>
        <a href="#blog" onClick={onClose}>Journal</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </div>
    </motion.div>
  );
};
