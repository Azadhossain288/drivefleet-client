"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const MyAddedCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/cars/my-cars/${user.email}`, { withCredentials: true })
        .then((res) => {
          setMyCars(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car listing?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, { withCredentials: true });
      alert("Car deleted successfully.");
      setMyCars(myCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete car.");
    }
  };

  if (!user) return <p className="text-center text-gray-600 mt-10 font-medium">Please login to view your added cars.</p>;
  if (loading) return <p className="text-center text-gray-600 mt-10 font-medium">Loading your listings...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 mb-6">My Added Cars For Rent ({myCars.length})</h2>
        {myCars.length === 0 ? (
          <div className="bg-white text-center p-8 rounded-2xl border border-gray-100 shadow-sm text-gray-500">You haven't listed any cars yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCars.map((car) => (
              <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Clicked image then going details page */}
                  <img 
                    src={car.imageUrl || car.image} 
                    alt={car.carName} 
                    onClick={() => router.push(`/cars/${car._id}`)}
                    className="w-full h-44 object-cover cursor-pointer hover:opacity-90 transition-all" 
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{car.carName}</h3>
                    <p className="text-sm text-gray-500">Rent: <span className="font-bold text-blue-600">${car.dailyPrice}/day</span> | Type: {car.carType}</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Booked: {car.bookingCount || 0} times</p>
                    
                    {/* view details button*/}
                    <button
                      onClick={() => router.push(`/cars/${car._id}`)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                {/* Edit & Delete button */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => router.push(`/my-added-cars/edit/${car._id}`)}
                    className="py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-sm font-bold rounded-xl transition"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCar(car._id)} className="py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedCars;