// src/app/page.tsx
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#fffbfc] to-rose-50/30 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="text-center md:text-left order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-rose-100 mb-8">
            <Sparkles className="text-rose-400 w-4 h-4" />
            <span className="text-xs uppercase tracking-widest text-gray-500">Ashongman Estate's Premier Aesthetic Clinic</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
            Love the skin <br />
            <span className="text-rose-400 italic">you're in.</span>
          </h1>
          
          <p className="text-gray-500 text-lg font-light mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
            Welcome to a sanctuary designed for you. We combine gentle care with powerful results to help you glow from within.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/contact" className="bg-rose-400 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:shadow-lg transition-all">
              Book Your Glow
            </Link>
            <Link href="/services" className="bg-white text-gray-600 border border-gray-200 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:border-rose-300 hover:text-rose-400 transition-all">
              Explore Menu
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            {/* IMPORTANT: Ensure 'Rama Care.png' is inside your 'public' folder */}
            <img src="/Rama Care.png" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000" alt="Rama Care Aesthetics" />
          </div>
        </div>
      </div>
    </div>
  );
}