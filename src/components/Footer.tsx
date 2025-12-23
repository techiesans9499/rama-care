// src/components/Footer.tsx
import { Instagram, Clock, MapPin, Heart, Flower2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Flower2 className="text-rose-400 w-5 h-5" />
          <span className="font-serif text-xl text-gray-800">Rama Care</span>
        </div>
        
        <div className="flex space-x-8 mb-8 text-gray-400">
          <Instagram className="hover:text-rose-400 cursor-pointer" size={20} />
          <Clock className="hover:text-rose-400 cursor-pointer" size={20} />
          <MapPin className="hover:text-rose-400 cursor-pointer" size={20} />
        </div>

        <p className="text-gray-400 text-sm mb-6">
          &copy; {new Date().getFullYear()} Rama Care Aesthetics. All rights reserved.
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>Made with</span>
          <Heart size={10} className="text-rose-400 fill-rose-400" />
          <span>by</span>
          <a href="[https://techiesans.com/](https://techiesans.com/)" target="_blank" className="text-gray-600 hover:text-rose-500 underline">
            Techiesans.com
          </a>
        </div>
      </div>
    </footer>
  );
}