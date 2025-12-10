"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useCourse from "@/hooks/useCourse";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, CheckCircle2, UserPlus } from "lucide-react";
import useEnrolment from "@/hooks/useEnrolment";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id as string;
  const { requestGetCourse } = useCourse();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { requestCreateEnrolment } = useEnrolment();

  const handleEnrolment = () => {
    if (!course.isEnrolled) {
      requestCreateEnrolment(parseInt(courseId));
    }
  };

  useEffect(() => {
    const getCourse = async () => {
      setIsLoading(true);
      const data = await requestGetCourse(parseInt(courseId));
      setCourse(data);
      setIsLoading(false);
    };

    getCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  // Dummy course topics
  const courseTopics = [
    "Introduction & Course Overview",
    "Getting Started with Fundamentals",
    "Core Concepts and Principles",
    "Intermediate Techniques",
    "Advanced Topics",
    "Real-World Project",
    "Best Practices & Optimization",
    "Conclusion & Next Steps",
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>
            <Badge variant="default">{course.category}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Instructor</p>
                <p className="text-lg font-semibold">{course.instructor}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Students Enrolled
                </p>
                <p className="text-lg font-semibold">
                  {course.enrolmentCount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Rating</p>
                <p className="text-lg font-semibold">4.8 ⭐</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{courseTopics.length} Topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enroll Section */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ready to Learn?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Start your learning journey today and master new skills
                </p>
                <Button
                  className="w-full"
                  size="lg"
                  variant={course.isEnrolled ? "secondary" : "default"}
                  onClick={handleEnrolment}>
                  {course.isEnrolled ? (
                    <>
                      <Check />
                      Enrolled
                    </>
                  ) : (
                    <>
                      <UserPlus />
                      Enroll Now
                    </>
                  )}
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Add to Wishlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
