import { apiInstance } from "@/config";
import { toast } from "sonner";

type UseCourseReturns = {
  requestGetCourses: () => Promise<Course[] | undefined>;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  enrolmentCount: number;
  category: string;
};

const useCourse = (): UseCourseReturns => {
  const requestGetCourses = async () => {
    try {
      const res = await apiInstance.get("/courses");
      return res.data.courses as Course[];
    } catch (error) {
      console.log(error);
      toast.error("An error occured while fetching courses");
      return undefined;
    }
  };

  const hooks = {
    requestGetCourses,
  };

  return hooks;
};

export default useCourse;
