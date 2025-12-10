import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = [
    {
      id: 1,
      title: "React - The Complete Guide 2025",
      description:
        "Learn React from scratch and build production-ready applications with modern techniques.",
      instructor: "Jonas Schmedtmann",
      enrolmentCount: 1250000,
      category: "Web Dev",
    },
    {
      id: 2,
      title: "The Complete JavaScript Course 2025",
      description:
        "Master JavaScript including ES6, async/await, OOP, and functional programming concepts.",
      instructor: "Jonas Schmedtmann",
      enrolmentCount: 2100000,
      category: "Web Dev",
    },
    {
      id: 3,
      title: "Machine Learning A-Z",
      description:
        "Learn machine learning algorithms, deep learning, NLP, and real-world ML applications.",
      instructor: "Kirill Eremenko",
      enrolmentCount: 950000,
      category: "ML/AI",
    },
    {
      id: 4,
      title: "Python for Data Science and ML",
      description:
        "Complete Python curriculum for data science, pandas, NumPy, scikit-learn, and visualization.",
      instructor: "Jose Portilla",
      enrolmentCount: 1850000,
      category: "Data Science",
    },
    {
      id: 5,
      title: "The Complete Web Development Bootcamp",
      description:
        "Full-stack development with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.",
      instructor: "Angela Yu",
      enrolmentCount: 1650000,
      category: "Web Dev",
    },
    {
      id: 6,
      title: "Advanced CSS and Sass",
      description:
        "Master modern CSS techniques, responsive design, animations, and Sass preprocessing.",
      instructor: "Jonas Schmedtmann",
      enrolmentCount: 580000,
      category: "Web Dev",
    },
    {
      id: 7,
      title: "AWS - The Complete Guide",
      description:
        "Learn AWS services, cloud architecture, EC2, S3, Lambda, and deploy production apps.",
      instructor: "Maximilian Schwarzmüller",
      enrolmentCount: 750000,
      category: "Cloud",
    },
    {
      id: 8,
      title: "Docker & Kubernetes: Complete Guide",
      description:
        "Master containerization with Docker and orchestration with Kubernetes from beginner to advanced.",
      instructor: "Maximilian Schwarzmüller",
      enrolmentCount: 620000,
      category: "DevOps",
    },
  ];

  await prisma.course.createMany({ data: courses });
  console.log("Created Multiple courses");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
