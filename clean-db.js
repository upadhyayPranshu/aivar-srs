const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function clean() {
  await prisma.testCase.deleteMany();
  await prisma.srsDocument.deleteMany();
  await prisma.project.deleteMany();
  console.log("Database cleaned!")
}
clean();
