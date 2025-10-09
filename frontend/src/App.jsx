import React, { useState, useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { useDispatch } from 'react-redux';
import { axiosInstance } from './config/axiosInstance';
import { setUser } from './features/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (res?.data?.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        // User not authenticated, keep loading false
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
