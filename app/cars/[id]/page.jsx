"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`, { withCredentials: true });
        if (response.data) {
          // ব্যাকএন্ড ডাটা রিসিভ করা (অবজেক্ট নেস্টিং হ্যান্ডেল সহ)
          setCar(response.data.car || response.data.data || response.data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCarDetails();
  }, [id]);

  if (loading) return <p className="text-center my-20 font-medium text-lg text-gray-600">Loading car details...</p>;
  if (!car) return <p className="text-center my-20 text-red-500 font-medium text-lg">Car not found!</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* বড় কার ইমেজ সেকশন */}
        <div className="w-full h-96 relative bg-gray-100">
          <img 
            src={car.imageUrl || car.image} 
            alt={car.carName} 
            className="w-full h-full object-cover"
          />
          {/* ব্যাক বাটন */}
          <button 
            onClick={() => router.back()}
            className="absolute top-5 left-5 px-4 py-2 bg-white hover:bg-gray-100 text-[#0f2942] font-bold rounded-xl shadow-sm transition-all text-sm border border-gray-200"
          >
            ← Back
          </button>
        </div>

        {/* গাড়ির বিস্তারিত তথ্য */}
        <div className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">{car.carName}</h1>
              <div className="flex gap-2 items-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold text-xs rounded-full uppercase tracking-wider">
                  Type: {car.carType}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 font-bold text-xs rounded-full uppercase tracking-wider">
                  Available
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-400 font-medium">Price Per Day</p>
              <p className="text-3xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm text-gray-500 font-normal">/day</span></p>
            </div>
          </div>

          {/* 📍 স্পেসিফিকেশন গ্রিড: এখানে আপনার পিকআপ লোকেশন যুক্ত করা হয়েছে */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            
            {/* পিকআপ লোকেশন বক্স */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xl shadow-sm">
                📍
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pickup Location</p>
                {/* ডাটাবেজে pickupLocation বা location যাই থাকুক, দুইটাই হ্যান্ডেল করবে */}
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {car.pickupLocation || car.location || "Not Specified"}
                </p>
              </div>
            </div>

            {/* সিট ক্যাপাসিটি বক্স */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xl shadow-sm">
                💺
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seat Capacity</p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {car.seatCapacity || "4"} Persons
                </p>
              </div>
            </div>

          </div>

          {/* ডেসক্রিপশন সেকশন */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              {car.description || "The car is in excellent condition, chilling AC, neat and clean interior, perfect for family trips."}
            </p>
          </div>

          {/* বুকিং বাটন - আপনার 'Available Cars' এর বাটনের মতো হুবহু মিলানো */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all uppercase tracking-wider text-sm">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}