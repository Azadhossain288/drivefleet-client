'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  
  if (loading) {
    return <LoadingSpinner />;
  }

  
  if (user) {
    return children;
  }

  return null;
}