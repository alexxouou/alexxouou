import React, { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'motion/react';

// Components
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { Atelier } from './components/Atelier';
import { Journal } from './components/Journal';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';

// Data
import { COLLECTIONS, BLOG_POSTS, REVIEWS } from './data';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <Header scrolled={scrolled} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main>
        <Hero />
        <Collections items={COLLECTIONS} />
        <Atelier y1={y1} y2={y2} />
        <Journal posts={BLOG_POSTS} />
        <Reviews reviews={REVIEWS} />
      </main>

      <Footer />
    </div>
  );
}
