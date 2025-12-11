import { apiInstance } from "@/config";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

type UseEnrolmentReturns = {
  requestCreateEnrolment: (courseId: number) => void;
  requestDeleteEnrolment: (courseId: number) => void;
};

const useEnrolment = (): UseEnrolmentReturns => {
  const { user } = useAuth();

  const requestCreateEnrolment = async (courseId: number) => {
    try {
      const res = await apiInstance.post("/enrolments", {
        userId: user?.id,
        courseId,
      });

      console.log(res.data);
      toast.success("Successfully Enrolled");
    } catch (error) {
      console.log(error);
      toast.error("An error occured while Enrolling");
    }
  };

  const requestDeleteEnrolment = async (courseId: number) => {
    try {
      const res = await apiInstance.delete("/enrolments", {
        data: {
          userId: user?.id,
          courseId,
        },
      });

      console.log(res.data);
      toast.success("Successfully Unenrolled");
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
  };

  const hooks = {
    requestCreateEnrolment,
    requestDeleteEnrolment,
  };

  return hooks;
};

export default useEnrolment;
