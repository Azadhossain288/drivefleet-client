"use client";

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/bookings/${user.email}`, { withCredentials: true })
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        alert("Booking Canceled Successfully.");
        setBookings(bookings.filter((b) => b._id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking.");
    }
  };

  if (!user) return <p className="text-center my-20 font-medium text-lg text-gray-600">Please login to view your bookings.</p>;
  if (loading) return <p className="text-center my-20 font-medium text-lg text-gray-600">Loading your bookings...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-black text-gray-900 mb-6">
          My Booked Cars ({bookings.length})
        </h2>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-gray-500 font-medium text-lg">You haven't booked any cars yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md transition-all"
              >
                {/* car image */}
                <img 
                  src={booking.imageUrl || (booking.carId?.imageUrl) || (booking.carId?.image)} 
                  alt={booking.carName} 
                  className="w-full sm:w-36 h-24 object-cover rounded-xl border border-gray-50"
                />
                
                {/* car information */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{booking.carName}</h3>
                  
                  
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Rent: <span className="text-blue-600 font-black">${booking.dailyPrice || booking.totalPrice || booking.dailyRent || "0"}</span>/day
                  </p>
                  
                  <p className="text-xs text-gray-400 font-medium">
                    Booked on: {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "Recent"}
                  </p>
                </div>
                
              
                <button 
                  onClick={() => handleCancelBooking(booking._id)} 
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;