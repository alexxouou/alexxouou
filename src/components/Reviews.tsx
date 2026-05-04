import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className="py-32 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
          <Sparkles className="w-10 h-10 mb-12 text-neutral-600" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
              {reviews.map((review) => (
                  <div key={review.id} className="text-center">
                      <div className="flex justify-center gap-1 mb-6 text-neutral-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                      <p className="text-xl font-serif italic mb-8 leading-relaxed">"{review.text}"</p>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">{review.author}</p>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
};
