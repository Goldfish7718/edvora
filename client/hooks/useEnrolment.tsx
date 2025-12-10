import { apiInstance } from "@/config";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import useCourse from "./useCourse";

type UseEnrolmentReturns = {
  requestCreateEnrolment: (courseId: number) => void;
};

const useEnrolment = (): UseEnrolmentReturns => {
  const { user } = useAuth();
  const { requestGetCourse } = useCourse();

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
      toast.error("An error occured while fetching courses");
    }
  };

  const hooks = {
    requestCreateEnrolment,
  };

  return hooks;
};

export default useEnrolment;
