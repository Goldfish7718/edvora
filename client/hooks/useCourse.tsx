import { apiInstance } from "@/config";
import { toast } from "sonner";

type UseCourseReturns = {
  requestGetCourses: () => Promise<CourseType[] | null>;
  requestGetCourse: (id: number) => Promise<CourseType | null>;
  requestAddCourse: (
    title: string,
    description: string,
    instructor: string,
    category: string
  ) => void;
  requestCourseDelete: (courseId: number) => void;
};

export type CourseType = {
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
      return res.data.courses as CourseType[];
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return null;
    }
  };

  const requestGetCourse = async (id: number) => {
    try {
      const res = await apiInstance.get(`/courses/${id}`);
      return res.data.course as CourseType;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return null;
    }
  };

  const requestAddCourse = async (
    title: string,
    description: string,
    instructor: string,
    category: string
  ) => {
    try {
      await apiInstance.post("/courses", {
        course: {
          title,
          description,
          instructor,
          category,
        },
      });

      toast.success("Course created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const requestCourseDelete = async (courseId: number) => {
    try {
      await apiInstance.delete(`/courses/${courseId}`);
      toast.success("Course Deleted");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const hooks = {
    requestGetCourses,
    requestGetCourse,
    requestAddCourse,
    requestCourseDelete,
  };

  return hooks;
};

export default useCourse;
