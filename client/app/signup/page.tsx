"use client";

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
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Join Edvora and start learning today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full">Create Account</Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
