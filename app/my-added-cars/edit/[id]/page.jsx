"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditCarPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        
        const response = await axios.get(`https://drivefleet-server-94v3.onrender.com/api/cars/${id}`, { withCredentials: true });
        if (response.data) {
          setCar(response.data.car || response.data.data || response.data);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCarDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.target);
    const updatedData = {
      carName: formData.get("carName"),
      dailyPrice: Number(formData.get("dailyPrice")),
      carType: formData.get("carType"),
      imageUrl: formData.get("imageUrl"),
      seatCapacity: Number(formData.get("seatCapacity")),
      pickupLocation: formData.get("pickupLocation"),
      description: formData.get("description"),
    };

    try {
      
      const response = await axios.put(`https://drivefleet-server-94v3.onrender.com/api/cars/${id}`, updatedData, { withCredentials: true });
      if (response.status === 200 || response.status === 201) {
        alert("✅ The car information successfully updated");
        router.push("/my-added-cars");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ problem updated");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center my-20 font-medium text-lg text-gray-600">Loading car details...</p>;
  
  if (!car) return (
    <div className="text-center my-20">
      <p className="text-red-500 font-medium text-xl mb-2">Car not found!</p>
      <p className="text-sm text-gray-500">not data from backend</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto my-14 p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
      
      <h2 className="text-3xl font-extrabold text-[#0f2942] mb-8 text-center">Update Car Details</h2>
      
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Car Name */}
        <div>
          <label className="block text-sm font-bold text-[#0f2942] mb-2">Car Name</label>
          <input 
            type="text" 
            name="carName" 
            defaultValue={car.carName} 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 focus:outline-none transition-all" 
            required 
          />
        </div>

        {/* Daily Price & Car Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#0f2942] mb-2">Daily Price ($)</label>
            <input 
              type="number" 
              name="dailyPrice" 
              defaultValue={car.dailyPrice} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0f2942] mb-2">Car Type</label>
            <select 
              name="carType" 
              defaultValue={car.carType} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white focus:outline-none transition-all"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Microbus">Microbus</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-bold text-[#0f2942] mb-2">Image URL</label>
          <input 
            type="text" 
            name="imageUrl" 
            defaultValue={car.imageUrl || car.image} 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none transition-all" 
            required 
          />
        </div>

        {/* Seat Capacity & Pickup Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-[#0f2942] mb-2">Seat Capacity</label>
            <input 
              type="number" 
              name="seatCapacity" 
              defaultValue={car.seatCapacity} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none transition-all" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0f2942] mb-2">Pickup Location</label>
            <input 
              type="text" 
              name="pickupLocation" 
              defaultValue={car.pickupLocation} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none transition-all" 
              required 
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-[#0f2942] mb-2">Description</label>
          <textarea 
            name="description" 
            rows="4" 
            defaultValue={car.description} 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none transition-all resize-none" 
            required
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => router.push("/my-added-cars")} 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={updating} 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:bg-gray-400 order-1 sm:order-2"
          >
            {updating ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
}