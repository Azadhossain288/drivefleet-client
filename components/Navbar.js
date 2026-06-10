'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
        
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tight">
            Drive<span className="text-gray-900">Fleet</span>
          </Link>
          
          
          <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/available-cars" className="hover:text-blue-600 transition">Available Cars</Link>
            
            {user && (
              <>
                <Link href="/add-car" className="hover:text-blue-600 transition">Add Car</Link>
                <Link href="/my-added-cars" className="hover:text-blue-600 transition">My Added Cars</Link>
                <Link href="/my-bookings" className="hover:text-blue-600 transition">My Bookings</Link>
              </>
            )}
          </div>

      
          <div className="flex items-center gap-2 sm:gap-4">
            
            
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <img 
                  title={user?.displayName || "User"} 
                  src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"} 
                  alt="Profile" 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-blue-500" 
                />
               
                <button onClick={logout} className="hidden md:block bg-gray-900 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm">
                Login
              </Link>
            )}

         
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none transition cursor-pointer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

     
      <div className={`md:hidden bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 space-y-2 flex flex-col text-sm font-bold text-gray-700">
          <Link onClick={() => setIsOpen(false)} href="/" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition">Home</Link>
          <Link onClick={() => setIsOpen(false)} href="/available-cars" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition">Available Cars</Link>
          
          {user && (
            <>
              <Link onClick={() => setIsOpen(false)} href="/add-car" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition">Add Car</Link>
              <Link onClick={() => setIsOpen(false)} href="/my-added-cars" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition">My Added Cars</Link>
              <Link onClick={() => setIsOpen(false)} href="/my-bookings" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition">My Bookings</Link>
              
           
              <button 
                onClick={() => { logout(); setIsOpen(false); }} 
                className="w-full text-left p-2 mt-2 text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer font-bold"
              >
                🚫 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}