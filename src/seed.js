const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("1234", 10);

  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Admin created");
}

main();