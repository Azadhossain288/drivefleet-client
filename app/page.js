"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const heroImages = [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
  ];

 
  const featuredCars = [
    { id: 1, name: "Tesla Model S", type: "Luxury", price: 120, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600" },
    { id: 2, name: "BMW M5 Competition", type: "Sports", price: 150, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600" },
    { id: 3, name: "Porsche 911 Carrera", type: "Exotic", price: 200, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600" },
  ];

  
  const testimonials = [
    { id: 1, name: "Rakib Hasan", role: "Business Traveler", text: "Amazing experience! The booking process was seamless, and the car was spotless. Will definitely rent again from DriveFleet.", avatar: "R" },
    { id: 2, name: "Anika Rahman", role: "Family Trip", text: "We rented an SUV for our weekend tour. The customer service was top-notch, and the driver was professional. Recommended!", avatar: "A" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between overflow-hidden relative font-sans">
      
  
      <style jsx global>{`
        @keyframes customKenBurns {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.12); }
        }
        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-super-kenburns { animation: customKenBurns 5s ease-out forwards; }
        .reveal-delay-1 { animation: textReveal 0.6s ease-out forwards; }
        .reveal-delay-2 { animation: textReveal 0.6s ease-out 0.2s forwards; opacity: 0; }
        .reveal-delay-3 { animation: textReveal 0.6s ease-out 0.4s forwards; opacity: 0; }
      `}</style>

      {/* ==================== 1. HERO SECTION ==================== */}
      <div className="relative text-white py-36 px-4 sm:px-6 lg:px-8 flex items-center min-h-[85vh]">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? "animate-super-kenburns" : ""}`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(10, 15, 30, 0.95) 30%, rgba(10, 15, 30, 0.6) 60%, rgba(10, 15, 30, 0.3)), url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
          <div key={currentImageIndex} className="text-left select-none">
            <span className="reveal-delay-1 inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-blue-500/20 backdrop-blur-md">
              ✨ Premium Mobility Experience
            </span>
            <h1 className="reveal-delay-2 text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Drive Your Dreams: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Premium Mobility</span> <br />
              at Your Fingertips.
            </h1>
            <p className="reveal-delay-3 text-base sm:text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              Discover a curated fleet of top-tier vehicles, perfectly integrated across smart local networks. Explore, book, and elevate your journey today.
            </p>
            <div className="reveal-delay-3 flex flex-wrap gap-4">
              <button onClick={() => router.push("/available-cars")} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer">
                EXPLORE CARS NOW 🚗
              </button>
            </div>
          </div>
          
         
          <div className="hidden lg:flex justify-end items-center pr-6">
            <div className="flex flex-col gap-4 bg-black/10 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
              {heroImages.map((_, index) => (
                <div key={index} className="relative w-1.5 h-12 bg-white/20 rounded-full overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-cyan-400 transition-all duration-[4500ms] ease-linear ${currentImageIndex === index ? "h-full" : "h-0"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 2. FEATURED CARS ==================== */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Our Featured Fleet</h2>
            <p className="text-gray-500 max-w-md mx-auto">Handpicked top-rated vehicles outstandingly maintained just for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                <div className="overflow-hidden h-48 relative">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{car.type}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{car.name}</h3>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200/60">
                    <span className="text-xl font-black text-gray-900">${car.price}<span className="text-xs text-gray-400 font-normal">/day</span></span>
                    <button onClick={() => router.push("/available-cars")} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== 3. WHY CHOOSE US ==================== */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 font-black">🛡️</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Secured Bookings</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Your data safety and booking confirmations are managed with strict top-tier validation algorithms.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 font-black">⚡</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Instant Confirmation</h4>
            <p className="text-sm text-gray-500 leading-relaxed">No waiting loops. Just select, submit payment properties, and get your vehicle confirmed instantaneously.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mx-auto mb-4 font-black">📍</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Flexible Locations</h4>
            <p className="text-sm text-gray-500 leading-relaxed">Pick up your premium vehicle from anywhere around your targeted local smart networks smoothly.</p>
          </div>
        </div>
      </div>

      {/* ==================== 4. TESTIMONIALS ==================== */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">What Our Customers Say</h2>
            <p className="text-gray-500">Read inspiring stories from our happy active enterprise renters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative shadow-sm flex flex-col justify-between">
                <p className="text-gray-600 italic leading-relaxed text-sm mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">{t.avatar}</div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">{t.name}</h5>
                    <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== 5. CONTACT FORM (FIXED SYNTAX) ==================== */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Get in Touch</h2>
            <p className="text-sm text-gray-500">Have questions about corporate deals? Drop us a prompt message.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
              
              <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm resize-none" placeholder="Write your requirements here..."></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer">
              Send Message ✉️
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Home;