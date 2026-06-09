

// ./app/my-bookings/page.js
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

  if (!user) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Please login to view your bookings.</p>;
  if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading your bookings...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>My Booked Cars ({bookings.length})</h2>
      {bookings.length === 0 ? (
        <p>You haven't booked any cars yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {bookings.map((booking) => (
            <div key={booking._id} style={{ display: "flex", gap: "20px", border: "1px solid #444", padding: "15px", borderRadius: "8px", backgroundColor: "#1e1e1e", alignItems: "center" }}>
              <img src={booking.imageUrl || (booking.carId?.imageUrl)} alt={booking.carName} style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "4px" }} />
              <div style={{ flex: 1 }}>
                <h3>{booking.carName}</h3>
                <p style={{ color: "#aaa", fontSize: "14px" }}>Rent: ${booking.dailyRent}/day</p>
                <p style={{ color: "#aaa", fontSize: "12px" }}>Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleCancelBooking(booking._id)} style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;



