// src/app/about/page.tsx
import { Flower2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbfc] px-6 pt-24">
      <div className="max-w-3xl text-center">
        <Flower2 className="w-16 h-16 text-rose-200 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Our Philosophy</h1>
        <p className="text-xl text-gray-500 leading-relaxed font-light">
          We believe that every woman deserves to feel confident in her own skin. 
          Our clinic in Ashongman Estate is more than just a medical facility; it's a safe space 
          where we nurture your natural beauty with kindness, expertise, and precision.
        </p>
      </div>
    </div>
  );
}