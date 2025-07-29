import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios(); 

  const { data: role, isLoading: roleLoading } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
