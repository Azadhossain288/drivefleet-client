"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const CarDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 
  const router = useRouter();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/cars/${id}`)
        .then((res) => {
          setCar(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching car details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  
  const handleBookCar = async () => {
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

      const response = await axios.post("http://localhost:5000/api/bookings", bookingInfo, {
        withCredentials: true,
      });

      if (response.data?.success || response.status === 200 || response.status === 201) {
        alert("Booking Confirmed Successfully! 🚗💨");
        
     
        setCar({ ...car, availabilityStatus: "Unavailable" });
        
     
        router.push("/my-bookings");
      } else {
        alert("Booking failed. Server rejected the request.");
      }
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert(`Booking failed: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  if (loading) return <p className="text-center my-20 font-medium text-lg text-gray-600">Loading car details...</p>;
  if (!car) return <p className="text-center my-20 font-medium text-lg text-red-500">Car not found!</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        

        <img 
          src={car.imageUrl || car.image} 
          alt={car.carName} 
          className="w-full h-96 object-cover"
        />

      
        <div className="p-8">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">{car.carName}</h2>
              <p className="text-gray-500 font-medium">
                Type: <span className="text-gray-800">{car.carType}</span> | Location: <span className="text-gray-800">{car.location || car.pickupLocation || "Not Specified"}</span>
              </p>
            </div>
            
           
            <div className="text-right">
              <p className="text-3xl font-black text-blue-600">${car.dailyPrice}<span className="text-sm font-normal text-gray-500">/day</span></p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${car.availabilityStatus === "Available" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {car.availabilityStatus}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

       
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Description & Features</h4>
            <p className="text-gray-600 leading-relaxed">
              {car.description || "No description provided for this vehicle. Contact DriveFleet corporate support for more details."}
            </p>
          </div>

         
          <button
            onClick={handleBookCar}
            disabled={car.availabilityStatus === "Unavailable"}
            className={`w-full py-4 rounded-xl font-bold transition-all text-base shadow-md ${
              car.availabilityStatus === "Available"
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {car.availabilityStatus === "Available" ? "Book Now" : "Already Booked"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CarDetails;