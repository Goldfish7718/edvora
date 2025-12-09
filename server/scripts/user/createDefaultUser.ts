import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "12345",
  };

  await prisma.user.create({ data: newUser });
  console.log("Created Default user John Doe");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
