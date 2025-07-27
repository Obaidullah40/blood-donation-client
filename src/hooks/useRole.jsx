import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (!authLoading && user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role || null);
        })
        .catch((err) => {
          console.error("Failed to get role:", err);
          setRole(null);
        })
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, axiosSecure]);

  return { role, loading };
};

export default useRole;
