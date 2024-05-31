import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseSecurity from "./UseSecurity";

const UseUser = () => {
  const { user } = UseAuth();
  // console.log("user is here", user);
  const axiosSecure = UseSecurity();
  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!localStorage.getItem("token"),
  });
  return { currentUser, isLoading, refetch };
};

export default UseUser;
