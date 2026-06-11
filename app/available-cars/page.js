"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const AvailableCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [carType, setCarType] = useState("all");
  const [sort, setSort] = useState("newest");
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
       
        const response = await axios.get(
          `https://drivefleet-server-94v3.onrender.com/api/cars?search=${search}&carType=${carType}&sort=${sort}`
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
        imageUrl: car.imageUrl || car.image,
        dailyPrice: Number(car.dailyPrice),
        totalPrice: Number(car.dailyPrice),
        userEmail: user.email,
        driverNeeded: "No", 
        bookingStatus: "Confirmed",
        bookingDate: new Date().toISOString()
      };

    
      const response = await axios.post("https://drivefleet-server-94v3.onrender.com/api/bookings", bookingInfo, {
        withCredentials: true,
      });

      if (response.data?.success || response.status === 200 || response.status === 201) {
        alert("Booking Confirmed Successfully! 🚗💨");
        setCars(cars.map(c => c._id === car._id ? { ...c, availabilityStatus: "Unavailable", bookingCount: (c.bookingCount || 0) + 1 } : c));
        router.push("/my-bookings"); 
      } else {
        alert("Booking failed. Server rejected the request.");
      }
    } catch (error) {
      console.error("Booking Error details:", error.response?.data || error.message);
      alert(`Booking failed: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Explore Available Cars</h2>

        {/* filter panel */}
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

        {/* 🚗 car grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full py-10">No cars found matching your criteria.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                <img 
                  src={car.imageUrl || car.image} 
                  alt={car.carName} 
                  onClick={() => router.push(`/cars/${car._id}`)}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-all" 
                />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{car.carName}</h3>
                    <p className="text-sm text-gray-500 mb-3">Type: {car.carType} | Location: {car.location || car.pickupLocation || "Not Specified"}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm font-normal text-gray-500">/day</span></span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${car.availabilityStatus === "Available" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {car.availabilityStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => router.push(`/cars/${car._id}`)}
                      className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl transition text-sm shadow-sm"
                    >
                      View Details
                    </button>

                    <button 
                      onClick={() => handleBookCar(car)} 
                      disabled={car.availabilityStatus === "Unavailable"} 
                      className={`w-full py-2.5 rounded-xl font-bold transition text-sm ${
                        car.availabilityStatus === "Available" 
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer" 
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {car.availabilityStatus === "Available" ? "Book Now" : "Already Booked"}
                    </button>
                  </div>

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