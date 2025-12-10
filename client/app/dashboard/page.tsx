import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "React - The Complete Guide 2025",
    description:
      "Learn React from scratch and build production-ready applications with modern techniques.",
    instructor: "Jonas Schmedtmann",
    students: 1250000,
    rating: 4.8,
    category: "Web Dev",
  },
  {
    id: 2,
    title: "The Complete JavaScript Course 2025",
    description:
      "Master JavaScript including ES6, async/await, OOP, and functional programming concepts.",
    instructor: "Jonas Schmedtmann",
    students: 2100000,
    rating: 4.8,
    category: "Web Dev",
  },
  {
    id: 3,
    title: "Machine Learning A-Z",
    description:
      "Learn machine learning algorithms, deep learning, NLP, and real-world ML applications.",
    instructor: "Kirill Eremenko",
    students: 950000,
    rating: 4.7,
    category: "ML/AI",
  },
  {
    id: 4,
    title: "Python for Data Science and ML",
    description:
      "Complete Python curriculum for data science, pandas, NumPy, scikit-learn, and visualization.",
    instructor: "Jose Portilla",
    students: 1850000,
    rating: 4.6,
    category: "Data Science",
  },
  {
    id: 5,
    title: "The Complete Web Development Bootcamp",
    description:
      "Full-stack development with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.",
    instructor: "Angela Yu",
    students: 1650000,
    rating: 4.8,
    category: "Web Dev",
  },
  {
    id: 6,
    title: "Advanced CSS and Sass",
    description:
      "Master modern CSS techniques, responsive design, animations, and Sass preprocessing.",
    instructor: "Jonas Schmedtmann",
    students: 580000,
    rating: 4.7,
    category: "Web Dev",
  },
  {
    id: 7,
    title: "AWS - The Complete Guide",
    description:
      "Learn AWS services, cloud architecture, EC2, S3, Lambda, and deploy production apps.",
    instructor: "Maximilian Schwarzmüller",
    students: 750000,
    rating: 4.7,
    category: "Cloud",
  },
  {
    id: 8,
    title: "Docker & Kubernetes: Complete Guide",
    description:
      "Master containerization with Docker and orchestration with Kubernetes from beginner to advanced.",
    instructor: "Maximilian Schwarzmüller",
    students: 620000,
    rating: 4.8,
    category: "DevOps",
  },
];

export default function Dashboard() {
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
          {courses.map((course) => (
            <Link key={course.id} href={`#`} className="cursor-pointer">
              <CourseCard
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                students={course.students}
                rating={course.rating}
                category={course.category}
              />
            </Link>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-12">
          <Button size="lg" variant="outline">
            Load More Courses
          </Button>
        </div>
      </main>
    </div>
  );
}
