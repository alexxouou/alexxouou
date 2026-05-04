import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Instagram, Phone, Mail, MapPin, 
  ChevronRight, ArrowRight, Star, Heart, 
  ShoppingBag, Sparkles, Languages
} from 'lucide-react';
import { IMAGE_IDS, getDriveImage } from './constants/images';

// Types
interface CollectionItem {
  id: number;
  title: string;
  image: string;
  price?: string;
  category: 'robes' | 'chaussures';
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
}

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

// Data
const COLLECTIONS: CollectionItem[] = [
  { id: 1, title: 'Modèle Audrey', image: getDriveImage(IMAGE_IDS.DRESS_AUDREY), category: 'robes' },
  { id: 2, title: 'Modèle Grace', image: getDriveImage(IMAGE_IDS.DRESS_GRACE), category: 'robes' },
  { id: 3, title: 'Modèle Marilyn', image: getDriveImage(IMAGE_IDS.DRESS_MARILYN), category: 'robes' },
  { id: 4, title: 'Escarpins Cendrillon', image: getDriveImage(IMAGE_IDS.SHOE_CINDERELLA), category: 'chaussures' },
  { id: 5, title: 'Mules Hollywood', image: getDriveImage(IMAGE_IDS.SHOE_HOLLYWOOD), category: 'chaussures' },
];

const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: 'L\'art du drapé à l\'atelier', category: 'Savoir-faire', image: getDriveImage(IMAGE_IDS.BLOG_DRAPERY), date: '12 Mars 2024' },
  { id: 2, title: 'Les mariées de cinéma', category: 'Inspiration', image: getDriveImage(IMAGE_IDS.BLOG_CINEMA), date: '05 Avril 2024' },
  { id: 3, title: 'Tendances nuptiales 2024', category: 'Style', image: getDriveImage(IMAGE_IDS.BLOG_TRENDS), date: '28 Avril 2024' },
];

const REVIEWS: Review[] = [
  { id: 1, author: "Marie L.", text: "Une expérience inoubliable. La robe de mes rêves est devenue réalité grâce aux doigts de fée de l'atelier.", rating: 5 },
  { id: 2, author: "Camille D.", text: "Un accueil chaleureux et des conseils précieux. Ma robe était parfaite jusqu'au moindre détail.", rating: 5 },
  { id: 3, author: "Sophie B.", text: "Plus qu'une robe, c'est une œuvre d'art que j'ai eu la chance de porter.", rating: 5 },
];

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
      {/* Navigation */}
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

      {/* Menu Mobile */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-12"
        >
          <button className="absolute top-8 right-6" onClick={() => setIsMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center gap-8 text-2xl font-serif uppercase tracking-[0.2em]">
            <a href="#collections" onClick={() => setIsMenuOpen(false)}>Collections</a>
            <a href="#atelier" onClick={() => setIsMenuOpen(false)}>L'Atelier</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)}>Journal</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
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

      {/* Collections Section */}
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
            {COLLECTIONS.map((item, index) => (
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

      {/* Atelier Section */}
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

      {/* Journal Section */}
      <section id="blog" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Le Journal</h2>
            <p className="text-gray-500 tracking-[0.2em] text-[10px] uppercase">Inspirations & Coulisses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {BLOG_POSTS.map((post) => (
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

      {/* Reviews */}
      <section className="py-32 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            <Sparkles className="w-10 h-10 mb-12 text-neutral-600" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                {REVIEWS.map((review) => (
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

      {/* Footer */}
      <footer className="py-24 px-6 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif uppercase tracking-[0.2em] mb-10">Maison Étoile</h3>
              <p className="text-gray-500 max-w-sm leading-loose">
                L'excellence du savoir-faire français au service de votre plus beau jour. Sur rendez-vous uniquement.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Contact</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">+33 (0)1 23 45 67 89</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">atelier@maisonetoile.com</span>
                </li>
                <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">75001 Paris, France</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Suivez-nous</h4>
              <div className="flex gap-6">
                <a href="#" className="p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded-full">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded-full">
                  <Languages className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between gap-8 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            <p>© 2024 Maison Étoile. All Rights Reserved.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-black">Mentions Légales</a>
              <a href="#" className="hover:text-black">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
