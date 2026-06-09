'use client';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success('Successfully logged in! 🚗');
      router.push('/');
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Logged in with Google! 🚀');
      router.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl border shadow-sm w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Sign in to manage your premium fleet journey</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" required placeholder="name@example.com" className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required placeholder="••••••••" className="w-full p-3 border rounded-xl" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition">Sign In</button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full border border-gray-300 text-gray-700 p-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.39 3.65 1.42 7.5l3.79 2.94C6.1 7.42 8.84 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"/>
            <path fill="#FBBC05" d="M5.21 14.56c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.42 7.06C.51 8.88 0 10.91 0 13s.51 4.12 1.42 5.94l3.79-2.38z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.73-2.89c-1.1.74-2.51 1.18-4.23 1.18-3.16 0-5.9-2.38-6.79-5.4l-3.79 2.94C3.39 20.35 7.35 23 12 23z"/>
          </svg>
          Google Authentication
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}