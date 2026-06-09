// ./app/register/page.js
"use client";

import React, { useState, useContext } from "react";
// আমাদের তৈরি করা AuthContext নিয়ে আসছি
import { AuthContext } from "@/context/AuthContext"; 

const SignupForm = () => {
  // AuthContext থেকে createUser ফাংশনটি বের করে নিচ্ছি
  const { createUser } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🚀 এখানে ফিক্স করা হয়েছে: ইমেইল এবং পাসওয়ার্ডের সাথে নাম ও ছবির ইউআরএল পাঠানো হচ্ছে
      const userCredential = await createUser(email, password, fullName, profileUrl);
      console.log("User registered with profile successfully:", userCredential.user);
      alert("Account created successfully!");
    } catch (err) {
      console.error(err);
      // ফায়ারবেসের এরর কোড হ্যান্ডেল করা হচ্ছে
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Profile Picture URL</label>
          <input type="text" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block" }}>Security Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;