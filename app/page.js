"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
     
      <div 
        className="relative bg-cover bg-center text-white py-32 px-4 sm:px-6 lg:px-8 flex-1 flex items-center"
        style={{
       
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 40%, rgba(15, 23, 42, 0.5)), url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&auto=format&fit=crop')`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
        
          <div className="text-left relative z-10">
            
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

         
          <div className="hidden lg:block"></div>

        </div>
      </div>

    </div>
  );
};

export default Home;