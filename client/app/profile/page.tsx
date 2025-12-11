"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useUser from "@/hooks/useUser";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

export type CourseDataType = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  enrolmentCount: number;
  category: string;
};

export type ProfileDataType = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  createdAt: string | Date;
  enrolments: CourseDataType[];
};

export default function ProfilePage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [profile, setProfile] = useState<ProfileDataType | null>(null);

  const { requestProfileData } = useUser();
  const { user } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      const data = await requestProfileData(user?.id as number);

      if (!data) toast.error("Error fetching profile");

      setProfile(data);
    };

    getProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account and view your enrolled courses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    {profile?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="text-lg font-semibold text-foreground">
                      {profile?.name}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="text-foreground font-medium">
                    {profile?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="text-foreground font-medium capitalize">
                    {profile?.role === "ADMIN" ? "Administrator" : "Student"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enrolled Courses</CardTitle>
                <CardDescription>
                  You are currently enrolled in {profile?.enrolments.length}{" "}
                  courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.enrolments.map((course) => (
                  <div
                    key={course.id}
                    className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <Link
                      href={`/courses/${course.id}`}
                      className="hover:underline">
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      By {course.instructor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <p className="text-xs text-primary mt-2 font-medium">
                      {course.category}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild>
                  <Link href="/dashboard">Continue Learning</Link>
                </Button>

                {/* Delete Account Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full"
                      disabled={isDeleting}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete your account? This
                        action cannot be undone. All your data and enrolled
                        courses will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-3">
                      <AlertDialogCancel className="flex-1">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        // onClick={}
                        className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white">
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
