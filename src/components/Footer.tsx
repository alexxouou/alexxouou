import React from 'react';
import { Instagram, Phone, Mail, MapPin, Languages } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
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
  );
};
