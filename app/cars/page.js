"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AvailableCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // live render backend link
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://drivefleet-server-94v3.onrender.com";

  useEffect(() => {
    
    axios
      .get(`${API_URL}/api/cars`)
      .then((res) => {
       
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        setLoading(false);
      });
  }, [API_URL]);

 
  const filteredCars = cars.filter((car) =>
    car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.carType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-600 mt-10 font-medium">Loading available cars...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-black text-gray-900">Available Cars For Rent</h2>
          
          
          <input
            type="text"
            placeholder="Search by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 text-sm text-gray-700 bg-white"
          />
        </div>

        {filteredCars.length === 0 ? (
          <div className="bg-white text-center p-12 rounded-2xl border border-gray-100 shadow-sm text-gray-500 font-medium">
            No cars found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <img
                    src={car.imageUrl || car.image}
                    alt={car.carName}
                    onClick={() => router.push(`/cars/${car._id}`)}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-95 transition-all"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{car.carName}</h3>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${car.availability === "Available" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {car.availability || "Available"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Type: {car.carType} | Location: {car.location || "N/A"}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div>
                        <p className="text-xs text-gray-400">Price Per Day</p>
                        <p className="text-lg font-black text-blue-600">${car.dailyPrice}</p>
                      </div>
                      <button
                        onClick={() => router.push(`/cars/${car._id}`)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCarsPage;