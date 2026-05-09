import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    user = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
      },
    });

    console.log("Admin user created");
  }

  const existingLeads = await prisma.lead.count();

  if (existingLeads === 0) {
    await prisma.lead.createMany({
    data: [
        {
        leadName: "John Doe",
        companyName: "TechNova",
        email: "john@technova.com",
        phoneNumber: "1234567890",
        leadSource: "LINKEDIN",
        assignedSalesperson: "Sarah Johnson",
        status: "NEW",
        dealValue: 15000,
        userId: user.id,
        },
        {
        leadName: "Emily Smith",
        companyName: "CloudSync",
        email: "emily@cloudsync.com",
        phoneNumber: "9876543210",
        leadSource: "WEBSITE",
        assignedSalesperson: "Michael Brown",
        status: "QUALIFIED",
        dealValue: 32000,
        userId: user.id,
        },
        {
        leadName: "David Lee",
        companyName: "NextGen Labs",
        email: "david@nextgenlabs.com",
        phoneNumber: "555666777",
        leadSource: "REFERRAL",
        assignedSalesperson: "Sarah Johnson",
        status: "WON",
        dealValue: 45000,
        userId: user.id,
        },
        {
        leadName: "Sophia Turner",
        companyName: "BrightPath",
        email: "sophia@brightpath.com",
        phoneNumber: "777888999",
        leadSource: "EVENT",
        assignedSalesperson: "Michael Brown",
        status: "LOST",
        dealValue: 12000,
        userId: user.id,
        },
        {
        leadName: "James Carter",
        companyName: "VisionIQ",
        email: "james@visioniq.com",
        phoneNumber: "111222333",
        leadSource: "WEBSITE",
        assignedSalesperson: "Emma Wilson",
        status: "CONTACTED",
        dealValue: 18000,
        userId: user.id,
        },
        {
        leadName: "Olivia Martin",
        companyName: "Skyline AI",
        email: "olivia@skylineai.com",
        phoneNumber: "444555666",
        leadSource: "LINKEDIN",
        assignedSalesperson: "Emma Wilson",
        status: "PROPOSAL_SENT",
        dealValue: 55000,
        userId: user.id,
        },
        {
        leadName: "Daniel Kim",
        companyName: "QuantumSoft",
        email: "daniel@quantumsoft.com",
        phoneNumber: "888999000",
        leadSource: "COLD_EMAIL",
        assignedSalesperson: "Michael Brown",
        status: "QUALIFIED",
        dealValue: 27000,
        userId: user.id,
        },
        {
        leadName: "Ava Thompson",
        companyName: "BluePeak",
        email: "ava@bluepeak.com",
        phoneNumber: "222333444",
        leadSource: "REFERRAL",
        assignedSalesperson: "Sarah Johnson",
        status: "WON",
        dealValue: 61000,
        userId: user.id,
        },
    ],
    });

    console.log("Sample leads created");
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });