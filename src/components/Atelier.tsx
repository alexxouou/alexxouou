import React from 'react';
import { motion, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { IMAGE_IDS, getDriveImage } from '../constants/images';

interface AtelierProps {
  y1: MotionValue<number>;
  y2: MotionValue<number>;
}

export const Atelier: React.FC<AtelierProps> = ({ y1, y2 }) => {
  return (
    <section id="atelier" className="py-32 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div className="relative flex justify-center">
            <motion.div style={{ y: y1 }} className="w-full max-w-md aspect-[3/4] bg-neutral-200 overflow-hidden shadow-2xl">
              <img 
                src={getDriveImage(IMAGE_IDS.ABOUT_MAIN)} 
                alt="Atelier Maison Étoile Wedding Dress" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute -bottom-12 -right-12 w-64 h-80 hidden md:block border-8 border-white overflow-hidden shadow-2xl">
              <img 
                src={getDriveImage(IMAGE_IDS.ABOUT_DETAIL)} 
                alt="Détails dentelle dorée" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>

          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-gray-400 mb-6 block">L'Héritage Savoir-Faire</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">La Magie de l'Inédit à votre Mesure</h2>
            <p className="text-gray-600 leading-loose mb-12 text-lg">
              Au cœur de notre atelier, chaque point de couture est une promesse. Nous travaillons les matières les plus nobles pour donner vie à une silhouette qui vous ressemble. Entre tradition et modernité, Maison Étoile sublime l'instant présent.
            </p>
            <button className="flex items-center gap-4 group text-[11px] uppercase tracking-[0.3em] font-bold">
              Découvrir l'Atelier 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
