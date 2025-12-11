import { apiInstance } from "@/config";
import { toast } from "sonner";

type UseCourseReturns = {
  requestGetCourses: () => Promise<CourseType[] | undefined>;
  requestGetCourse: (id: number) => Promise<CourseType | undefined>;
  requestAddCourse: (
    title: string,
    description: string,
    instructor: string,
    category: string
  ) => void;
  requestCourseDelete: (courseId: number) => Promise<any>;
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
    } catch (error) {
      console.log(error);
      toast.error("An error occured while fetching courses");
      return undefined;
    }
  };

  const requestGetCourse = async (id: number) => {
    try {
      const res = await apiInstance.get(`/courses/${id}`);
      return res.data.course as CourseType;
    } catch (error) {
      console.log(error);
      toast.error("An error occured while fetching course");
      return undefined;
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
    } catch (error) {
      console.log(error);
      toast.error("An error occured while creating course");
    }
  };

  const requestCourseDelete = (courseId: number) => {
    return apiInstance.delete(`/courses/${courseId}`);
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
