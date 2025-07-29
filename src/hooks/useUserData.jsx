// src/hooks/useUserData.js
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUserData = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const res = await axiosInstance.get('/profile');
          setUserData(res.data);
        } catch (err) {
          console.error("Failed to fetch userData:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user?.email, axiosInstance]);

  return { userData, loading };
};

export default useUserData;
