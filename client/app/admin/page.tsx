"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCourse, { CourseType } from "@/hooks/useCourse";
import useUser from "@/hooks/useUser";
import NewCourseTrigger from "@/components/newcourse-trigger";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  createdAt: string;
};

export default function AdminPanel() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const { requestUsers } = useUser();
  const { requestGetCourses, requestCourseDelete } = useCourse();

  const handleDelete = async (courseId: number) => {
    try {
      await toast.promise(() => requestCourseDelete(courseId), {
        loading: "Deleting course...",
        success: () => "Course deleted",
        error: (err) => {
          const msg = "Delete failed";
          return msg;
        },
      });

      setCourses((prev) => prev.filter((item) => item.id !== courseId));
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      const [userData, courseData] = await Promise.all([
        requestUsers(),
        requestGetCourses(),
      ]);

      setUsers(userData as UserType[]);
      setCourses(courseData as CourseType[]);
    };

    fetchAdminData();
  }, []);

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <NewCourseTrigger>
            <Button variant="default">New Course</Button>
          </NewCourseTrigger>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Card */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b">
                      <th className="py-2">ID</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Role</th>
                      <th className="py-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b last:border-b-0">
                        <td className="py-2 text-sm">{u.id}</td>
                        <td className="py-2 text-sm">{u.name}</td>
                        <td className="py-2 text-sm wrap-break-words">
                          {u.email}
                        </td>
                        <td className="py-2 text-sm">{u.role}</td>
                        <td className="py-2 text-sm">
                          {new Date(u.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <div className="mt-2 text-sm">No users found.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Courses Card */}
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b">
                      <th className="py-2">ID</th>
                      <th className="py-2">Title</th>
                      <th className="py-2">Instructor</th>
                      <th className="py-2">Enrolments</th>
                      <th className="py-2">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <tr
                            key={c.id}
                            className="border-b last:border-b-0 hover:bg-neutral-100 hover:cursor-pointer"
                            onClick={() => handleDelete(c.id)}>
                            <td className="py-2 text-sm">{c.id}</td>
                            <td className="py-2 text-sm wrap-break-words max-w-xs">
                              {c.title}
                            </td>
                            <td className="py-2 text-sm">{c.instructor}</td>
                            <td className="py-2 text-sm">
                              {c.enrolmentCount.toLocaleString()}
                            </td>
                            <td className="py-2 text-sm">{c.category}</td>
                          </tr>
                        </TooltipTrigger>
                        <TooltipContent>Click to delete</TooltipContent>
                      </Tooltip>
                    ))}
                  </tbody>
                </table>
                {courses.length === 0 && (
                  <div className="mt-2 text-sm">No courses found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
