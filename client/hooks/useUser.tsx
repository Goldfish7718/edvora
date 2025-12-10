import { apiInstance } from "@/config";
import { toast } from "sonner";

type UseUserReturns = {
  requestLogin: (email: string, password: string) => void;
};

export default function useUser(): UseUserReturns {
  const requestLogin = async (email: string, password: string) => {
    try {
      const res = await apiInstance.post("/users/login", {
        user: {
          email,
          password,
        },
      });

      console.log(res.data);
      toast("Login successful");
    } catch (error) {
      console.log(error);
      toast("An error occured");
    }
  };

  const hooks = {
    requestLogin,
  };

  return hooks;
}
