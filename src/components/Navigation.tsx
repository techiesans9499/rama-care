// src/components/Navigation.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Flower2 } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Beauty Menu', href: '/services' },
    { name: 'Our Story', href: '/about' },
    { name: 'Book Visit', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fffbfc]/90 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <div className="flex items-center gap-2">
            <Flower2 className="text-rose-400 w-6 h-6" strokeWidth={1.5} />
            <span className="text-2xl font-serif text-gray-800 tracking-wide group-hover:text-rose-500 transition-colors">
              Rama Care
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 mt-1">Aesthetics</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
                pathname === link.href
                  ? 'text-rose-500 border-b border-rose-300 pb-1' 
                  : 'text-gray-500 hover:text-rose-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute w-full bg-[#fffbfc] border-b border-rose-100 md:hidden p-8 flex flex-col space-y-6 text-center shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-gray-600 hover:text-rose-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
