import { prisma } from '../lib/prisma';

async function main() {
  await prisma.lead.createMany({
    data: [
      {
        company: 'Startup Alpine',
        participants: 20,
        duration: 90,
        catering: true,
        meetingRoom: true,
        email: 'alpine@example.com',
        phone: '+33450646290',
        message: 'Team building printemps',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
