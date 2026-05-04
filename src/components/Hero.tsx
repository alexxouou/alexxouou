import React from 'react';
import { motion } from 'motion/react';
import { IMAGE_IDS, getDriveImage } from '../constants/images';

export const Hero: React.FC = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={getDriveImage(IMAGE_IDS.HERO_BG)} 
          alt="Maison Étoile Wedding Dress" 
          className="w-full h-full object-cover object-[center_35%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/30" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[11px] uppercase tracking-[0.4em] mb-6 font-medium"
        >
          Atelier de Haute Couture Nuptiale
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-5xl md:text-8xl font-serif mb-12"
        >
          L'Éclat d'un Instant
        </motion.h2>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="px-10 py-4 bg-black text-white text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-800 transition-all hover:scale-105"
        >
          Découvrir la Collection
        </motion.button>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-24 bg-gradient-to-b from-black to-transparent" />
      </div>
    </header>
  );
};
