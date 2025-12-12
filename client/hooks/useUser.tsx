import { UserType } from "@/app/admin/page";
import { ProfileDataType } from "@/app/profile/page";
import { apiInstance } from "@/config";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UseUserReturns = {
  requestLogin: (email: string, password: string) => void;
  requestSignUp: (name: string, email: string, password: string) => void;
  requestCurrentUser: () => void;
  requestProfileData: (userId: number) => Promise<ProfileDataType | null>;
  requestLogout: () => void;
  requestUsers: () => Promise<UserType[] | null>;
};

export default function useUser(): UseUserReturns {
  const { setUser } = useAuth();
  const router = useRouter();

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
      router.push("/courses");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
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
      router.push("/courses");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const requestCurrentUser = async () => {
    try {
      const res = await apiInstance.get("/users/current");
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error);
    }
  };

  const requestProfileData = async (userId: number) => {
    try {
      const res = await apiInstance.get(`/users/profile/${userId}`);
      return res.data.profile as ProfileDataType;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return null;
    }
  };

  const requestLogout = async () => {
    try {
      await apiInstance.post("/users/logout");
      router.push("/");
      toast.success("Logged out");
      requestCurrentUser();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const requestUsers = async () => {
    try {
      const res = await apiInstance.get("/users");
      return res.data.users as UserType[];
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return null;
    }
  };

  const hooks = {
    requestLogin,
    requestSignUp,
    requestCurrentUser,
    requestProfileData,
    requestLogout,
    requestUsers,
  };

  return hooks;
}
