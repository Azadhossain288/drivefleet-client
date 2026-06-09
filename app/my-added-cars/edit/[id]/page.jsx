"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditCarPage() {
  const { id } = useParams(); // id from url
  const router = useRouter();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/api/v1/cars/${id}`);
        setCar(response.data);
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
      pickupLocation: formData.get("pickupLocation"),
      description: formData.get("description"),
    };

    try {
     
      const response = await axios.put(`http://localhost:5000/api/v1/cars/${id}`, updatedData);
      if (response.status === 200) {
        alert("✅ গাড়িটির তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/my-added-cars"); // আপডেট শেষে মেইন পেজে ফেরত নিয়ে যাবে
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center my-20 font-medium text-lg">Loading car details...</p>;
  if (!car) return <p className="text-center my-20 text-red-500 font-medium text-lg">Car not found!</p>;

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Car Details</h2>
      
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Car Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Car Name</label>
          <input
            type="text"
            name="carName"
            defaultValue={car.carName}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Daily Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Daily Price ($)</label>
          <input
            type="number"
            name="dailyPrice"
            defaultValue={car.dailyPrice}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            defaultValue={car.pickupLocation}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            rows="4"
            defaultValue={car.description}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => router.push("/my-added-cars")}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:bg-gray-400"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}