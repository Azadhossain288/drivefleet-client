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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* big car image */}
        <div className="w-full h-96 relative bg-gray-100">
          <img 
            src={car.imageUrl || car.image} 
            alt={car.carName} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => router.back()}
            className="absolute top-5 left-5 px-4 py-2 bg-white/90 hover:bg-white text-[#0f2942] font-bold rounded-xl shadow-md transition-all text-sm"
          >
            ← Back
          </button>
        </div>

        {/* description of car */}
        <div className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-black text-[#0f2942] mb-2">{car.carName}</h1>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full uppercase tracking-wider">
                {car.carType}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-400 font-medium">Price Per Day</p>
              <p className="text-3xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm text-gray-500 font-normal">/day</span></p>
            </div>
          </div>

          {/* grid specification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase">Pickup Location</p>
              <p className="text-base font-bold text-[#0f2942] mt-1">{car.pickupLocation}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase">Seat Capacity</p>
              <p className="text-base font-bold text-[#0f2942] mt-1">{car.seatCapacity} Persons</p>
            </div>
          </div>

          {/* description */}
          <div>
            <h3 className="text-lg font-bold text-[#0f2942] mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-5 rounded-xl border border-gray-100/70">
              {car.description || "No description provided for this car."}
            </p>
          </div>

          {/* booking or another part */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all">
              Book This Car
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}