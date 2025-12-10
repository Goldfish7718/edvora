import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newCourse = {
    title: "Next.js Developer",
    description:
      "This course provides a complete, practical introduction to building modern, high-performance web applications using Next.js. You will learn how to use file-based routing, server and client components, API routes, data fetching patterns, dynamic rendering, and deployment best practices. The program focuses on real-world development, helping you understand how to design scalable architectures, integrate databases, manage authentication, and optimize application speed.",
    instructor: "Tejas Nanoti",
    enrolmentCount: 0,
    category: "Web dev",
  };

  await prisma.course.create({ data: newCourse });
  console.log("Created Default course");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
