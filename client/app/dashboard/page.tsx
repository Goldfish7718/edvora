"use client";

import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { CourseSkeleton } from "@/components/course-skeleton";
import useCourse, { type Course } from "@/hooks/useCourse";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { requestGetCourses } = useCourse();

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      const data = await requestGetCourses();
      if (data) setCourses(data);
      setIsLoading(false);
    };

    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-pretty">Explore Our Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from thousands of courses and start learning today
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="cursor-pointer">
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    instructor={course.instructor}
                    enrolmentCount={course.enrolmentCount}
                    rating={4.8}
                    category={course.category}
                  />
                </Link>
              ))}
        </div>
      </main>
    </div>
  );
}
