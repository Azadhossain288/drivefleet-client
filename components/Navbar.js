'use client';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tight">
            Drive<span className="text-gray-900">Fleet</span>
          </Link>
          
          <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            
            {/* 🚀 ফিক্সড: আপনার তৈরি করা ফোল্ডারের নামের সাথে মিলিয়ে /available-cars করা হলো */}
            <Link href="/available-cars" className="hover:text-blue-600 transition">Available Cars</Link>
            
            {user && (
              <>
                <Link href="/add-car" className="hover:text-blue-600 transition">Add Car</Link>
                <Link href="/my-added-cars" className="hover:text-blue-600 transition">My Added Cars</Link>
                <Link href="/my-bookings" className="hover:text-blue-600 transition">My Bookings</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <img 
                  title={user?.displayName || "User"} 
                  src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500" 
                />
                <button onClick={logout} className="bg-gray-900 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}