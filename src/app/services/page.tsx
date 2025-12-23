// src/app/services/page.tsx
import { Flower2 } from 'lucide-react';

const services = [
  { title: "Microneedling", desc: "For texture & firmness" },
  { title: "Bio Microneedling", desc: "Natural resurfacing" },
  { title: "Chemical Peel", desc: "Reveal new skin" },
  { title: "I.V. Therapy", desc: "Glow from within" },
  { title: "Fat Dissolving", desc: "Sculpt & shape" },
  { title: "Mesotherapy", desc: "Vitamin infusion" },
  { title: "Facials", desc: "Deep relaxation" },
  { title: "Skin Tag Removal", desc: "Clear perfection" },
  { title: "Waxing", desc: "Silky smooth" },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-rose-400 font-serif italic text-xl">Pamper yourself</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2 mb-6">Our Beauty Menu</h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto">
            Every face is unique. We customize our pricing based on a personal assessment of your skin's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-[#fffbfc] rounded-3xl p-8 hover:bg-rose-50 transition-colors duration-300 border border-gray-50 hover:border-rose-100">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                <Flower2 size={20} />
              </div>
              <h3 className="text-xl font-serif text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">{service.title}</h3>
              <p className="text-gray-500 font-light text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
