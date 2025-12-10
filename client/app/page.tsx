"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20">
          <div className="text-center space-y-6 w-full max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              <span className="text-pretty">
                Learn Anything, Anytime, Anywhere
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground">
              Unlock your potential with thousands of courses taught by industry
              experts. Start your learning journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 w-full">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground">Active Learners</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">1K+</p>
              <p className="text-sm text-muted-foreground">Expert Courses</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground">Topics Covered</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
