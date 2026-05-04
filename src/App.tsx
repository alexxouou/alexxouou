/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, 
  Search, 
  Calendar, 
  ChevronRight, 
  Mail, 
  MapPin, 
  Phone,
  Menu,
  X,
  ArrowRight,
  Star,
  Plus
} from 'lucide-react';
import { IMAGE_IDS, GOOGLE_DRIVE_BASE_URL } from './constants/images';

// --- Types ---
interface CollectionItem {
  id: number;
  title: string;
  film: string;
  image: string;
  price: string;
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
  name: string;
  date: string;
  content: string;
  rating: number;
  image?: string;
}

// --- Constants & Helpers ---
const getDriveImage = (idOrLink: string) => {
  if (!idOrLink) return "";

  let id = idOrLink;
  
  // Extract ID from full URL or sharing link
  if (idOrLink.includes('drive.google.com')) {
    // Look for /d/ID or id=ID
    const match = idOrLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || idOrLink.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      id = match[1];
    }
  }

  // If it's a long string without slashes, it's likely a Google Drive ID
  if (id.length > 20 && !id.includes('/')) {
    // The googleusercontent proxy is the most reliable for bypass/direct hotlinking
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  
  return idOrLink;
};

// --- Data ---
const DRESSES: CollectionItem[] = [
  { id: 1, title: "L'Éclat d'Audrey", film: "Diamants sur canapé", image: getDriveImage(IMAGE_IDS.DRESS_AUDREY), price: "Sur mesure" },
  { id: 2, title: "La Grâce de Grace", film: "Fenêtre sur cour", image: getDriveImage(IMAGE_IDS.DRESS_GRACE), price: "Sur mesure" },
  { id: 3, title: "Le Souffle de Marilyn", film: "Sept ans de réflexion", image: getDriveImage(IMAGE_IDS.DRESS_MARILYN), price: "Sur mesure" },
];

const SHOES: CollectionItem[] = [
  { id: 4, title: "Escarpin Cendrillon", film: "Le Soulier de Verre", image: getDriveImage(IMAGE_IDS.SHOE_CINDERELLA), price: "1 200 €" },
  { id: 5, title: "Mule Hollywood", film: "Ève", image: getDriveImage(IMAGE_IDS.SHOE_HOLLYWOOD), price: "950 €" },
];

const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "L'art du drapé : Secrets d'ateliers", category: "Artisanat", image: getDriveImage(IMAGE_IDS.BLOG_DRAPERY), date: "Mars 2026" },
  { id: 2, title: "Le mariage au cinéma : 5 robes cultes", category: "Cinéma", image: getDriveImage(IMAGE_IDS.BLOG_CINEMA), date: "Février 2026" },
  { id: 3, title: "Tendances 2026 : Le retour du voile", category: "Tendances", image: getDriveImage(IMAGE_IDS.BLOG_TRENDS), date: "Janvier 2026" },
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Éléonore de V.",
    date: "Avril 2026",
    content: "Une expérience absolument hors du commun. La robe 'L'Éclat d'Audrey' m'a transportée dans un autre temps. L'attention aux détails est tout simplement incomparable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophie L.",
    date: "Mars 2026",
    content: "Le rendez-vous privé était magique. On se sent écoutée et comprise. Ma robe sur mesure est le reflet exact de ce que j'avais imaginé.",
    rating: 5,
  },
  {
    id: 3,
    name: "Camille R.",
    date: "Février 2026",
    content: "Maison Étoile a su capturer l'élégance que je recherchais. Les souliers sont aussi confortables qu'élégants. Merci à toute l'équipe.",
    rating: 4,
  },
];

// --- Components ---

const openKlaviyoForm = () => {
  // @ts-ignore
  const klOnsite = window._klOnsite || [];
  // @ts-ignore
  klOnsite.push(['openForm', 'YwypUG']);
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Robes', href: '#dresses' },
    { label: 'Chaussures', href: '#shoes' },
    { label: 'Rendez-vous', href: '#appointment' },
    { label: 'Avis', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex justify-between items-center">
        <a href="#home" className="text-xl md:text-2xl font-serif tracking-[0.4em] uppercase text-black shrink-0 transition-transform hover:scale-[1.02]">
          Maison <span className="italic font-light">Étoile</span>
        </a>

        <div className="hidden lg:flex items-center space-x-20">
          <div className="flex items-center space-x-12">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link font-medium">
                {item.label}
              </a>
            ))}
          </div>

          <div className="w-[1px] h-3 bg-black/5" />

          <div className="flex items-center relative gap-4">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  autoFocus
                  placeholder="RECHERCHE..."
                  className="bg-transparent border-b border-black/5 text-[9px] uppercase tracking-[0.3em] outline-none py-1 placeholder:text-black/20"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative flex items-center justify-center w-8 h-8 group overflow-hidden"
              aria-label="Recherche"
            >
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-4 h-4 text-black/40 group-hover:text-black transition-colors" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search className="w-4.5 h-4.5 text-black/40 group-hover:text-black transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <button 
          className="lg:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-black/10 p-8 flex flex-col space-y-6 lg:hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="nav-link text-center text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        style={{ y }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={getDriveImage(IMAGE_IDS.HERO_BG)} 
          alt="Maison Étoile Wedding Dress" 
          className="w-full h-full object-cover object-[center_35%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-black text-[10px] md:text-xs uppercase tracking-[0.6em] mb-8"
        >
          Haute Couture Nuptiale
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-black text-6xl md:text-8xl lg:text-9xl font-serif mb-16 leading-[1.1]"
        >
          Entrez dans votre histoire,<br />
          <span className="italic font-light">portez une icône.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <a 
            href="#appointment" 
            className="inline-flex items-center px-12 py-5 bg-white text-black text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700 ease-in-out group"
          >
            Prendre rendez-vous
            <ChevronRight className="ml-3 w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-4 rotate-180 [writing-mode:vertical-lr]">Découvrir</span>
        <div className="w-[1px] h-20 bg-black/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 80] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-8 bg-black"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden">
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

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-black/40 text-[10px] uppercase tracking-[0.4em] mb-6 block">Notre Héritage</span>
          <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">
            L'élégance intemporelle <br />
            <span className="italic font-light">née du septième art.</span>
          </h2>
          <div className="luxury-line"></div>
          <div className="space-y-8 text-black/60 font-light leading-relaxed text-lg lg:pr-12">
            <p>
              Maison Étoile est née d'une passion dévorante pour l'âge d'or du cinéma et la virtuosité de la haute couture nuptiale. Chaque création est un hommage aux silhouettes qui ont marqué l'histoire, de la sophistication d'Audrey Hepburn à la sensualité de Marilyn Monroe.
            </p>
            <p>
              Dans notre atelier parisien, le temps semble s'arrêter. Nos artisans façonnent chaque robe à la main, utilisant des soies lyonnaises et des dentelles de Calais pour que chaque mariée se sente l'héroïne de son propre film.
            </p>
          </div>
          <div className="mt-16 pt-12 border-t border-black/5 flex items-center space-x-12">
            <div>
              <p className="text-3xl font-serif text-black mb-1">1954</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Fondation</p>
            </div>
            <div className="w-[1px] h-12 bg-black/5" />
            <div>
              <p className="text-3xl font-serif text-black mb-1">100%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Fait main</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CollectionSection = ({ title, subtitle, items, id }: { title: string, subtitle: string, items: CollectionItem[], id: string }) => {
  return (
    <section id={id} className="section-padding bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-black/40 text-[10px] uppercase tracking-[0.5em] mb-6 block">{subtitle}</span>
          <h2 className="text-5xl md:text-6xl font-serif">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-black/5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="px-8 py-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em]">
                    Détails de la pièce
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/95 backdrop-blur-md">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-2">Inspiré par</p>
                  <p className="text-base font-serif italic">{item.film}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">Collection Icônes</p>
                </div>
                <p className="text-black/60 font-light tracking-[0.1em] text-sm mt-1">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <button className="text-[10px] uppercase tracking-[0.4em] border-b border-black pb-3 hover:text-black/40 hover:border-black/20 transition-all duration-500">
            Explorer l'univers complet
          </button>
        </div>
      </div>
    </section>
  );
};

const Appointment = () => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section id="appointment" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-black/40 text-[10px] uppercase tracking-[0.4em] mb-6 block">Expérience Boutique</span>
          <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">Un moment <br /><span className="italic font-light">rien qu'à vous.</span></h2>
          <p className="text-black/60 font-light leading-relaxed text-lg mb-16 max-w-xl">
            Nous vous accueillons dans notre boudoir privé pour une séance d'essayage personnalisée. Champagne, conseils experts et discrétion absolue pour trouver la pièce qui fera de vous une icône.
          </p>
          
          <div className="space-y-10">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 border border-black/5 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-black/60" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1 tracking-tight">Conseil Privé</h4>
                <p className="text-xs text-black/40 uppercase tracking-widest">1h30 d'accompagnement exclusif</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 border border-black/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-black/60" />
              </div>
              <div>
                <h4 className="font-serif text-xl mb-1 tracking-tight">Atelier Parisien</h4>
                <p className="text-xs text-black/40 uppercase tracking-widest">22 Rue du Faubourg Saint-Honoré</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 lg:p-16 border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-serif text-2xl tracking-tight">Avril 2026</h3>
            <div className="flex space-x-2">
              <button className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all duration-500"><ChevronRight className="w-3.5 h-3.5 rotate-180" /></button>
              <button className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all duration-500"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-6 mb-12">
            {days.map(day => (
              <div key={day} className="text-center text-[9px] uppercase tracking-[0.2em] text-black/30 font-medium">{day}</div>
            ))}
            {dates.slice(0, 24).map(date => (
              <button 
                key={date} 
                className={`aspect-square flex items-center justify-center text-xs tracking-widest transition-all duration-500
                  ${date === 14 ? 'bg-black text-white' : 'hover:bg-black/5'}`}
              >
                {date}
              </button>
            ))}
          </div>

          <button className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.4em] hover:bg-black/80 transition-all duration-700 ease-in-out">
            Confirmer la date
          </button>
          <p className="text-center text-[9px] text-black/30 mt-6 uppercase tracking-[0.1em]">
            * Un acompte est requis pour valider votre créneau.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Journal = () => {
  return (
    <section id="journal" className="section-padding bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-black/40 text-[10px] uppercase tracking-[0.5em] mb-6 block">Le Journal</span>
            <h2 className="text-5xl md:text-6xl font-serif">Inspirations & <span className="italic font-light">Histoires</span></h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.3em] group flex items-center border-b border-black pb-2 hover:text-black/40 transition-all duration-500">
            Tout lire <ArrowRight className="ml-3 w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {BLOG_POSTS.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden mb-8 relative bg-black/5">
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
              <p className="text-[9px] text-black/30 uppercase tracking-[0.3em] mb-3">{post.date}</p>
              <h3 className="text-2xl font-serif mb-6 group-hover:text-black/60 transition-colors tracking-tight leading-snug">{post.title}</h3>
              <button className="text-[10px] uppercase tracking-[0.3em] border-b border-black/10 pb-2 group-hover:border-black transition-all duration-500">
                Explorer l'article
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section id="newsletter" className="section-padding bg-black text-white border-y border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-serif italic text-white select-none whitespace-nowrap">Maison Étoile</span>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.6em] mb-8 block">Le Club Étoile</span>
        <h2 className="text-6xl md:text-7xl font-serif mb-10 text-white leading-tight">Rejoignez <br /><span className="italic font-light">l'Excellence</span></h2>
        <p className="text-white/50 font-light leading-relaxed text-xl mb-16 max-w-2xl mx-auto">
          Inscrivez-vous pour recevoir nos invitations exclusives, nos nouvelles collections et les coulisses de notre atelier.
        </p>
        <button 
          onClick={openKlaviyoForm}
          className="px-16 py-6 bg-white text-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/90 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] transition-all duration-700 ease-in-out"
        >
          S'inscrire au club
        </button>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="reviews" className="section-padding bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-black/40 text-[10px] uppercase tracking-[0.5em] mb-6 block">Témoignages</span>
            <h2 className="text-5xl md:text-6xl font-serif">Avis <span className="italic font-light">Clientèles</span></h2>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="text-[10px] uppercase tracking-[0.3em] group flex items-center border-b border-black pb-2 hover:text-black/40 hover:border-black/20 transition-all duration-500"
          >
            {showForm ? 'Annuler' : 'Laisser un avis'} <Plus className={`ml-3 w-3.5 h-3.5 transition-transform duration-500 ${showForm ? 'rotate-45' : ''}`} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-24"
            >
              <div className="bg-black/5 p-10 md:p-16 border border-black/5">
                <h3 className="text-3xl font-serif mb-12 tracking-tight">Partagez votre expérience</h3>
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-black/40 block">Votre Nom d'Exception</label>
                      <input type="text" className="w-full bg-white border-b border-black/10 px-0 py-4 focus:border-black outline-none transition-all duration-500" placeholder="Ex: Marie-Louise Chantal" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-black/40 block">Note de Satisfaction</label>
                      <div className="flex space-x-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" className="text-black/10 hover:text-black transition-colors duration-300">
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-black/40 block">Votre Récit</label>
                      <textarea rows={4} className="w-full bg-white border-b border-black/10 px-0 py-4 focus:border-black outline-none transition-all duration-500 resize-none" placeholder="Décrivez la magie de votre essayage..." />
                    </div>
                    <button className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.4em] hover:bg-black/80 transition-all duration-700 ease-in-out">
                      Soumettre mon témoignage
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {REVIEWS.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="border border-black/5 p-12 flex flex-col h-full bg-white transition-all duration-1000 hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] hover:-translate-y-2"
            >
              <div className="flex mb-10 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < review.rating ? 'text-black fill-current' : 'text-black/5'}`} 
                  />
                ))}
              </div>
              <p className="text-xl font-light leading-[1.8] italic text-black/60 mb-12 flex-grow tracking-tight">
                "{review.content}"
              </p>
              <div className="border-t border-black/5 pt-10 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-xl tracking-tight mb-1">{review.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">Mariée d'Exception</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/20 font-medium">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white text-black section-padding pb-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-32">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif mb-16 text-black leading-tight">Nous <span className="italic font-light">Rencontrer.</span></h2>
            <div className="space-y-12">
              <div className="flex items-center space-x-8 group cursor-pointer">
                <div className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:border-black transition-colors duration-500">
                  <Mail className="w-4 h-4 text-black/60" />
                </div>
                <p className="text-xl font-light tracking-tight">atelier@maisonetoile.paris</p>
              </div>
              <div className="flex items-center space-x-8 group cursor-pointer">
                <div className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:border-black transition-colors duration-500">
                  <Phone className="w-4 h-4 text-black/60" />
                </div>
                <p className="text-xl font-light tracking-tight">+33 (0)1 42 65 00 00</p>
              </div>
              <div className="flex items-center space-x-8 group cursor-pointer">
                <div className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:border-black transition-colors duration-500">
                  <MapPin className="w-4 h-4 text-black/60" />
                </div>
                <p className="text-xl font-light tracking-tight">22 Rue du Faubourg Saint-Honoré, VIIe</p>
              </div>
            </div>

            <div className="mt-24">
              <p className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-8 font-medium">L'Univers Numérique</p>
              <div className="flex flex-col space-y-6">
                <div className="flex space-x-12">
                  <a href="#" className="text-black/40 hover:text-black transition-all duration-500 hover:-translate-y-1"><Instagram className="w-6 h-6" /></a>
                  <a href="#" className="text-black/40 hover:text-black transition-all duration-500 font-serif italic text-2xl hover:-translate-y-1 leading-none">P</a>
                  <a href="#" className="text-black/40 hover:text-black transition-all duration-500 font-serif italic text-2xl hover:-translate-y-1 leading-none">f</a>
                </div>
                <button 
                  onClick={openKlaviyoForm}
                  className="text-[9px] uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors w-fit border-b border-black/5 pb-1"
                >
                  Rejoindre le Club Étoile
                </button>
              </div>
            </div>
          </div>

          <form className="space-y-12 bg-black/5 p-10 md:p-16 border border-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] text-black/20 block">Votre Nom</label>
                <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-all duration-700" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] text-black/20 block">Votre Email</label>
                <input type="email" className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-all duration-700" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-black/20 block">Nature de votre demande</label>
              <select className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-all duration-700 appearance-none cursor-pointer text-black/60">
                <option className="bg-white text-black/60">Demande d'essayage privé</option>
                <option className="bg-white text-black/60">Création Haute Couture sur mesure</option>
                <option className="bg-white text-black/60">Accompagnement presse</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-black/20 block">Votre Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-black/10 py-4 focus:border-black outline-none transition-all duration-700 resize-none" />
            </div>
            <button className="w-full py-6 bg-black text-white text-[10px] uppercase tracking-[0.4em] hover:bg-black/80 transition-all duration-700 ease-in-out shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
              Initier le contact
            </button>
          </form>
        </div>

        <div className="pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-[9px] uppercase tracking-[0.4em] text-black/20 font-medium">
            © 2026 Maison Étoile — Excellence Parisienne
          </p>
          <div className="flex space-x-12">
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-all duration-500">Mentions Légales</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-black/20 hover:text-black transition-all duration-500">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <CollectionSection 
        id="dresses"
        title="La Collection Robes" 
        subtitle="Inspirations Cinéma" 
        items={DRESSES} 
      />
      <CollectionSection 
        id="shoes"
        title="La Collection Souliers" 
        subtitle="Détails Faits Main" 
        items={SHOES} 
      />
      <Appointment />
      <ReviewsSection />
      <Journal />
      <Newsletter />
      <Footer />
    </main>
  );
}
