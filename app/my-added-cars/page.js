

// ./app/available-cars/page.js
"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const AvailableCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [carType, setCarType] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars?search=${search}&carType=${carType}&sort=${sort}`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [search, carType, sort]);

  const handleBookCar = async (car) => {
    if (!user) {
      alert("Please log in to book this car!");
      return;
    }
    if (car.availabilityStatus === "Unavailable") {
      alert("This car is already booked!");
      return;
    }

    try {
      const bookingInfo = {
        carId: car._id,
        carName: car.carName,
        imageUrl: car.imageUrl,
        dailyPrice: car.dailyPrice, 
        userEmail: user.email,
      };

      const response = await axios.post("http://localhost:5000/api/bookings", bookingInfo, {
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Booking Confirmed Successfully! 🚗💨");
        setCars(cars.map(c => c._id === car._id ? { ...c, availabilityStatus: "Unavailable", bookingCount: c.bookingCount + 1 } : c));
      }
    } catch (error) {
      console.error(error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Available Cars for Rent</h2>

        {/* 🛠️ ফিল্টার প্যানেল */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 mb-8">
          <input type="text" placeholder="Search by car name..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
          
          <select value={carType} onChange={(e) => setCarType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-xl text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-xl text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* car grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full py-10">No cars found.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <img src={car.imageUrl} alt={car.carName} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{car.carName}</h3>
                    {/* fixed car location*/}
                    <p className="text-sm text-gray-500 mb-2">Type: {car.carType} | Location: <span className="text-gray-800 font-medium">{car.location}</span></p>
                    
                    {/* new added for see description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">{car.description}</p>
                    
                    <div className="flex justify-between items-center mb-2">
                      {/* car.dailyprice */}
                      <span className="text-2xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm font-normal text-gray-500">/day</span></span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${car.availabilityStatus === "Available" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {car.availabilityStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Total Booked: {car.bookingCount || 0} times</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button onClick={() => handleBookCar(car)} disabled={car.availabilityStatus === "Unavailable"} className={`w-full py-2.5 rounded-xl font-bold transition ${car.availabilityStatus === "Available" ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    {car.availabilityStatus === "Available" ? "Book Now" : "Already Booked"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;


