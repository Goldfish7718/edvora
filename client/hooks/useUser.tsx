import { apiInstance } from "@/config";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

type UseUserReturns = {
  requestLogin: (email: string, password: string) => void;
  requestSignUp: (name: string, email: string, password: string) => void;
};

export default function useUser(): UseUserReturns {
  const { setUser } = useAuth();

  const requestLogin = async (email: string, password: string) => {
    try {
      const res = await apiInstance.post("/users/login", {
        user: {
          email,
          password,
        },
      });

      console.log(res.data);
      setUser(res.data.user);
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
  };

  const requestSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await apiInstance.post("/users", {
        user: {
          name,
          email,
          password,
        },
      });

      console.log(res.data);
      setUser(res.data.user);
      toast.success("Sign up successful");
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
  };

  const hooks = {
    requestLogin,
    requestSignUp,
  };

  return hooks;
}
