import React from 'react';
import { motion } from 'motion/react';
import { CollectionItem } from '../types';

interface CollectionsProps {
  items: CollectionItem[];
}

export const Collections: React.FC<CollectionsProps> = ({ items }) => {
  return (
    <section id="collections" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Les Collections d'Exception</h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              Chaque création est une ode à la féminité, mêlant dentelles délicates, tulles vaporeux et coupes architecturales.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-black pb-1 hover:opacity-50 transition-opacity">Tout voir</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-neutral-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="px-8 py-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em]">
                    Voir les détails
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400 mb-2">{item.category}</p>
                <h3 className="text-xl font-serif uppercase tracking-[0.1em]">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
