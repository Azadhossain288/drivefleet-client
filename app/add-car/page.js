// ./app/add-car/page.js
"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    carName: "",
    dailyPrice: "", // fixed daily price
    carType: "SUV",
    imageUrl: "",
    seatCapacity: "",
    location: "",    // pixed location
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      alert("Please login first to add a car!");
      return;
    }

    setLoading(true);
    try {
      const carData = {
        ...formData,
        dailyPrice: Number(formData.dailyPrice),     // according to mongoose Number
        seatCapacity: Number(formData.seatCapacity), 
        ownerEmail: user.email,                      // login user email
        availabilityStatus: "Available",            // fixed available status
        bookingCount: 0,
      };

      // express backend api call
      const response = await axios.post("http://localhost:5000/api/cars", carData, {
        withCredentials: true,
      });

      if (response.data) {
        alert("Car Added Successfully! 🎉");
        setFormData({
          carName: "",
          dailyPrice: "",
          carType: "SUV",
          imageUrl: "",
          seatCapacity: "",
          location: "",
          description: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add car. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add a New Car for Rent</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Car Name</label>
            <input type="text" name="carName" value={formData.carName} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="e.g. Toyota Innova Crysta" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Daily Price ($)</label>
              <input type="number" name="dailyPrice" value={formData.dailyPrice} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Price per day" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Car Type</label>
              <select name="carType" value={formData.carType} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="https://example.com/car-image.png" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Seat Capacity</label>
              <input type="number" name="seatCapacity" value={formData.seatCapacity} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="e.g. 7" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="e.g. Mirpur, Dhaka" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400" placeholder="Write something about the car's condition..."></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed">
            {loading ? "Adding..." : "Submit Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;