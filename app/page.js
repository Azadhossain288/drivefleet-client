"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const heroImages = [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&auto=format&fit=crop", // Mercedes
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop", // BMW
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"  // Porsche
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between overflow-hidden relative">
      
     
      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-kenburns {
          animation: kenBurns 4.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

   
      <div className="relative text-white py-32 px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        
        {/* backend slider image layer */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              currentImageIndex === index ? "animate-kenburns" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 35%, rgba(15, 23, 42, 0.4)), url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}

        {/* synmatic text content */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
          
     
          <div className="text-left animate-fade-in-up">
            
           
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest rounded-full mb-6 border border-blue-500/30 backdrop-blur-sm">
              Premium Mobility Experience
            </span>

          
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
              Drive Your Dreams: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Premium Mobility
              </span> <br />
              at Your Fingertips.
            </h1>

           
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mb-10 font-medium leading-relaxed">
              Discover a curated fleet of top-tier vehicles, perfectly integrated across smart local networks. Explore, book, and elevate your journey today.
            </p>

         
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/available-cars")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-base transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                EXPLORE CARS NOW 🚗
              </button>
              
              <button
                onClick={() => router.push("/my-bookings")}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/20 transition-all text-base backdrop-blur-sm cursor-pointer"
              >
                Manage Bookings
              </button>
            </div>
          </div>

      
          <div className="hidden lg:flex justify-end items-center h-full pr-6">
            <div className="flex flex-col gap-3">
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-700 ${
                    currentImageIndex === index ? "bg-blue-400 w-10 shadow-lg shadow-blue-500/50" : "bg-white/20 w-4"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;