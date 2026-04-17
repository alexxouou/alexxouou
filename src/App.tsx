/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight
} from 'lucide-react';

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

// --- Data ---
const DRESSES: CollectionItem[] = [
  { id: 1, title: "L'Éclat d'Audrey", film: "Diamants sur canapé", image: "/photo/82255b362eaf01f4bc4747ca1309fd49.jpg", price: "Sur mesure" },
  { id: 2, title: "La Grâce de Grace", film: "Fenêtre sur cour", image: "/photo/8798907db8422c89cafb456531d061f6.jpg", price: "Sur mesure" },
  { id: 3, title: "Le Souffle de Marilyn", film: "Sept ans de réflexion", image: "/photo/c4379ef34ef3f5a87a64dd61d04b58e4.jpg", price: "Sur mesure" },
];

const SHOES: CollectionItem[] = [
  { id: 4, title: "Escarpin Cendrillon", film: "Le Soulier de Verre", image: "/photochaussure/7b907c823619aa1ecb525b70aa991cdc.jpg", price: "1 200 €" },
  { id: 5, title: "Mule Hollywood", film: "Ève", image: "/photochaussure/084cfdf071d5fb617e3ff702f6cfd89f.jpg", price: "950 €" },
];

const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "L'art du drapé : Secrets d'ateliers", category: "Artisanat", image: "/photo/ -3.jpg", date: "Mars 2026" },
  { id: 2, title: "Le mariage au cinéma : 5 robes cultes", category: "Cinéma", image: "/photo/This model wore a trio of dresses for her lemon yellow, Italian summer-inspired wedding.jpg", date: "Février 2026" },
  { id: 3, title: "Tendances 2026 : Le retour du voile", category: "Tendances", image: "/photo/8798907db8422c89cafb456531d061f6.jpg", date: "Janvier 2026" },
];

// --- Components ---

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
    { label: 'Héritage', href: '#about' },
    { label: 'Robes', href: '#dresses' },
    { label: 'Chaussures', href: '#shoes' },
    { label: 'Rendez-vous', href: '#appointment' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-black">
          Maison <span className="italic">Étoile</span>
        </a>

        <div className="hidden lg:flex items-center space-x-8">
          <Search className="w-4 h-4 text-black/60 cursor-pointer hover:text-black transition-colors mr-4" />
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
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
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/photo/8798907db8422c89cafb456531d061f6.jpg" 
          alt="Maison Étoile Wedding Dress" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/10" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-md"
        >
          Haute Couture Nuptiale
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-serif mb-12 leading-tight drop-shadow-lg"
        >
          Entrez dans votre histoire,<br />
          <span className="italic">portez une icône.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <a 
            href="#appointment" 
            className="inline-flex items-center px-10 py-4 bg-white/90 backdrop-blur-sm text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 group"
          >
            Prendre rendez-vous
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-24 bg-white/50 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-12 bg-black"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="/photo/This model wore a trio of dresses for her lemon yellow, Italian summer-inspired wedding.jpg" 
              alt="Atelier Maison Étoile Wedding Dress" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-80 hidden md:block border-8 border-white overflow-hidden shadow-2xl">
            <img 
              src="/photo/82255b362eaf01f4bc4747ca1309fd49.jpg" 
              alt="Détails dentelle dorée" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-black text-xs uppercase tracking-[0.3em] mb-4 block">Notre Héritage</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-snug">
            L'élégance intemporelle <br />
            <span className="italic">née du septième art.</span>
          </h2>
          <div className="space-y-6 text-black/70 font-light leading-relaxed text-lg">
            <p>
              Maison Étoile est née d'une passion dévorante pour l'âge d'or du cinéma et la virtuosité de la haute couture nuptiale. Chaque création est un hommage aux silhouettes qui ont marqué l'histoire, de la sophistication d'Audrey Hepburn à la sensualité de Marilyn Monroe.
            </p>
            <p>
              Dans notre atelier parisien, le temps semble s'arrêter. Nos artisans façonnent chaque robe à la main, utilisant des soies lyonnaises et des dentelles de Calais aux reflets dorés, pour que chaque mariée se sente l'héroïne de son propre film.
            </p>
          </div>
          <div className="mt-12 pt-12 border-t border-black/10 flex items-center space-x-8">
            <div>
              <p className="text-2xl font-serif text-black">1954</p>
              <p className="text-[10px] uppercase tracking-widest text-black/50">Fondation</p>
            </div>
            <div className="w-[1px] h-8 bg-black/10" />
            <div>
              <p className="text-2xl font-serif text-black">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-black/50">Fait main</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CollectionSection = ({ title, subtitle, items, id }: { title: string, subtitle: string, items: CollectionItem[], id: string }) => {
  return (
    <section id={id} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-black text-xs uppercase tracking-[0.3em] mb-4 block">{subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-serif">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/80 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-widest text-black mb-1">Inspiré par</p>
                  <p className="text-sm font-serif italic">{item.film}</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-serif mb-1">{item.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-black/40">Collection Icônes</p>
                </div>
                <p className="text-black font-light tracking-widest text-sm">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button className="text-xs uppercase tracking-[0.3em] border-b border-black pb-2 hover:text-black transition-colors">
            Voir toute la collection
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
          <span className="text-black text-xs uppercase tracking-[0.3em] mb-4 block">Expérience Boutique</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Un moment <br /><span className="italic">rien qu'à vous.</span></h2>
          <p className="text-black/70 font-light leading-relaxed text-lg mb-12">
            Nous vous accueillons dans notre boudoir privé pour une séance d'essayage personnalisée. Champagne, conseils experts et discrétion absolue pour trouver la pièce qui fera de vous une icône.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-black" />
              </div>
              <div>
                <h4 className="font-serif text-lg">Conseil Privé</h4>
                <p className="text-sm text-black/50">1h30 d'accompagnement exclusif avec notre styliste.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-black" />
              </div>
              <div>
                <h4 className="font-serif text-lg">Atelier Parisien</h4>
                <p className="text-sm text-black/50">22 Rue du Faubourg Saint-Honoré, 75008 Paris.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-10 shadow-xl border border-black/10"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl">Avril 2026</h3>
            <div className="flex space-x-4">
              <button className="p-2 hover:text-black transition-colors"><ChevronRight className="w-4 h-4 rotate-180" /></button>
              <button className="p-2 hover:text-black transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-8">
            {days.map(day => (
              <div key={day} className="text-center text-[10px] uppercase tracking-widest text-black/40 font-bold">{day}</div>
            ))}
            {dates.slice(0, 24).map(date => (
              <button 
                key={date} 
                className={`aspect-square flex items-center justify-center text-sm transition-all duration-300
                  ${date === 14 ? 'bg-black text-white shadow-lg' : 'hover:bg-white hover:text-black'}`}
              >
                {date}
              </button>
            ))}
          </div>

          <button className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition-colors duration-500">
            Confirmer la date
          </button>
          <p className="text-center text-[10px] text-black/30 mt-4 uppercase tracking-tighter">
            * Un acompte de 50€ est requis pour valider votre créneau.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Journal = () => {
  return (
    <section id="journal" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-black text-xs uppercase tracking-[0.3em] mb-4 block">Le Journal</span>
            <h2 className="text-4xl md:text-5xl font-serif">Inspirations & <span className="italic">Histoires</span></h2>
          </div>
          <button className="text-xs uppercase tracking-[0.3em] group flex items-center">
            Tout lire <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="aspect-video overflow-hidden mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <p className="text-[10px] text-black/40 uppercase tracking-widest mb-2">{post.date}</p>
              <h3 className="text-xl font-serif mb-4 group-hover:text-black transition-colors">{post.title}</h3>
              <button className="text-[10px] uppercase tracking-widest border-b border-black/20 pb-1 group-hover:border-black transition-colors">
                Lire l'article
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white section-padding pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-white">Contactez <span className="italic">l'Atelier</span></h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <Mail className="w-5 h-5 text-white" />
                <p className="text-lg font-light">contact@maisonetoile.fr</p>
              </div>
              <div className="flex items-center space-x-6">
                <Phone className="w-5 h-5 text-white" />
                <p className="text-lg font-light">+33 (0)1 42 65 00 00</p>
              </div>
              <div className="flex items-center space-x-6">
                <MapPin className="w-5 h-5 text-white" />
                <p className="text-lg font-light">22 Rue du Faubourg Saint-Honoré, Paris</p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6">Suivez-nous</p>
              <div className="flex space-x-8">
                <a href="#" className="hover:text-white/60 transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="hover:text-white/60 transition-colors font-serif italic text-xl">P</a>
                <a href="#" className="hover:text-white/60 transition-colors font-serif italic text-xl">f</a>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Nom Complet</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Sujet</label>
              <select className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors appearance-none cursor-pointer">
                <option className="bg-black">Demande d'essayage</option>
                <option className="bg-black">Création sur mesure</option>
                <option className="bg-black">Presse & Partenariats</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors resize-none" />
            </div>
            <button className="px-12 py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-white/80 transition-all duration-500">
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            © 2026 Maison Étoile. Tous droits réservés.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">Politique de Confidentialité</a>
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
      <Journal />
      <Footer />
    </main>
  );
}
