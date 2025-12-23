'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ContactPage() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget; // Capture the form element
    const formData = new FormData(form);
    
    // Append images manually
    images.forEach((file) => formData.append('images', file));

    try {
      const res = await fetch('/api/booking', { method: 'POST', body: formData });
      if (res.ok) {
        alert('Booking request sent! Check your email for confirmation.');
        
        // --- CLEAR DATA LOGIC ---
        form.reset();       // Clears inputs (Text, Date, Select)
        setImages([]);      // Clears image state
        setPreviews([]);    // Clears image thumbnails
        // ------------------------

      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-rose-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Info Side */}
        <div className="lg:w-2/5 bg-rose-100 p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-4xl font-serif text-gray-900 mb-4">Let's Connect</h2>
                <p className="text-gray-600 font-light">Please fill out the form to request your appointment.</p>
            </div>
            
            <div className="mt-8 space-y-6">
                {/* Booking Policy */}
                <div className="bg-white/60 p-6 rounded-2xl border border-rose-100 shadow-sm">
                    <h4 className="text-sm font-bold uppercase text-rose-500 mb-3">Booking an Appointment (NO WALK-IN)</h4>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                        <li>Kindly choose a date and time of your convenience.</li>
                        <li>A non-refundable deposit of <strong>GH₵50</strong> is required to validate your booking.</li>
                        <li>The deposit will be deducted from your total treatment cost after the procedure.</li>
                    </ul>
                </div>
                
                {/* Contact & Location Block */}
                <div className="bg-white/60 p-6 rounded-2xl border border-rose-100 shadow-sm space-y-5">
                    
                    {/* Phone */}
                    <div>
                        <h4 className="text-sm font-bold uppercase text-rose-500 mb-1">Phone</h4>
                        <p className="text-sm text-gray-600 font-medium">+233 55 844 2988</p>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h4 className="text-sm font-bold uppercase text-rose-500 mb-1">Working Hours</h4>
                        <p className="text-sm text-gray-600">Mon - Sat (9am to 5pm)</p>
                        <p className="text-sm text-gray-600">Sun - (9am to 2pm)</p>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="text-sm font-bold uppercase text-rose-500 mb-1">Location</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Ashongman Estate 2nd Lotto Kiosk or Verandys Restaurant
                        </p>
                        <p className="text-xs text-gray-500 mt-1 italic">
                          (Find us on Uber, Bolt & Yango)
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form Side */}
        <div className="lg:w-3/5 p-12 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-400">Name</label>
                    <input name="name" required className="w-full border-b border-gray-200 py-3 text-gray-900 focus:border-rose-400 outline-none" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-gray-400">Email</label>
                    <input name="email" type="email" required className="w-full border-b border-gray-200 py-3 text-gray-900 focus:border-rose-400 outline-none" placeholder="jane@example.com" />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Phone Number</label>
                <input name="phone" type="tel" required className="w-full border-b border-gray-200 py-3 text-gray-900 focus:border-rose-400 outline-none" placeholder="055 555 5555" />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Preferred Date & Time</label>
                <input 
                  type="datetime-local" 
                  name="date" 
                  required 
                  className="w-full border-b border-gray-200 py-3 text-gray-900 focus:border-rose-400 outline-none bg-white" 
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Treatment Wishlist</label>
                <select name="service" className="w-full border-b border-gray-200 py-3 text-gray-900 bg-white focus:border-rose-400 outline-none">
                    <option value="">Select a service...</option>
                    <option value="Microneedling">Microneedling</option>
                    <option value="Chemical Peel">Chemical Peel</option>
                    <option value="IV Therapy">IV Therapy</option>
                </select>
            </div>

            <div className="pt-6">
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-rose-50 cursor-pointer relative">
                    <input type="file" multiple onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload photos</p>
                </div>
                {previews.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                        {previews.map((src, i) => <img key={i} src={src} className="w-16 h-16 rounded-lg object-cover" />)}
                    </div>
                )}
            </div>

            <button disabled={isSubmitting} className="w-full bg-gray-900 text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-rose-500 transition-colors shadow-lg mt-4">
                {isSubmitting ? 'Sending...' : 'Confirm & Pay Deposit (50 GH)'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}