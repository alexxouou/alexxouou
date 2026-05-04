import React from 'react';
import { motion } from 'motion/react';
import { BlogPost } from '../types';

interface JournalProps {
  posts: BlogPost[];
}

export const Journal: React.FC<JournalProps> = ({ posts }) => {
  return (
    <section id="blog" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Le Journal</h2>
          <p className="text-gray-500 tracking-[0.2em] text-[10px] uppercase">Inspirations & Coulisses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {posts.map((post) => (
            <motion.article key={post.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden mb-8 bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] font-medium">
                  {post.category}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">{post.date}</p>
              <h3 className="text-2xl font-serif mb-4 group-hover:opacity-60 transition-opacity">{post.title}</h3>
              <div className="w-8 h-px bg-black transition-all group-hover:w-16" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
