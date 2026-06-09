// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcvXv4InyEKa-yewKxij9gBVVG4wqx0JY",
  authDomain: "drivefleet-66b43.firebaseapp.com",
  projectId: "drivefleet-66b43",
  storageBucket: "drivefleet-66b43.firebasestorage.app",
  messagingSenderId: "671659039816",
  appId: "1:671659039816:web:84a35a1e117362daebcc7d",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export default app;