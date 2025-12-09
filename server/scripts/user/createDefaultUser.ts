import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = {
    name: "Tejas Nanoti",
    email: "tejasnanoti2@gmail.com",
    password: "12345",
  };

  await prisma.user.create({ data: newUser });
  console.log("Created Default user Tejas Nanoti");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
