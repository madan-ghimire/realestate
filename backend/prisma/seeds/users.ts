import { PrismaClient, RoleType } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export async function addUsers(db: PrismaClient) {
  const users = [
    {
      email: "admin@email.com",
      username: "admin",
      password: process.env.ADMIN_PASSWORD || "Admin@123",
      firstName: "System",
      lastName: "Admin",
      tenantName: "Default Tenant",
      role: RoleType.ADMINISTRATOR,
    },
    {
      email: "superadmin@email.com",
      username: "superadmin",

      password: process.env.SUPER_ADMIN_PASSWORD || "SuperAdmin@123",
      firstName: "Super",
      lastName: "Admin",
      tenantName: "Global Tenant",
      role: RoleType.SUPER_ADMIN,
    },
  ];

  console.log("whats gone on");

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);

    // Ensure tenant exists

    const tenant = await db.tenant.upsert({
      where: { name: u.tenantName },
      update: {},
      create: {
        name: u.tenantName,
        description: `${u.tenantName} tenant for setup`,
      },
    });

    // Create or update user

    const user = await db.user.upsert({
      where: { email: u.email },
      update: {
        password: hashedPassword,
        role: u.role,
      },
      create: {
        email: u.email,
        password: hashedPassword,
        firstName: u.firstName,
        lastName: u.lastName,
        tenantId: tenant.id,
        username: u.username,
      },
    });

    // Assign role
    await db.userRole.upsert({
      where: {
        userId_role_tenantId: {
          userId: user.id,
          role: u.role,
          tenantId: tenant.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        role: u.role,
        tenantId: tenant.id,
      },
    });
    console.log(`✅ Seeded ${u.role}: ${u.email} (tenant: ${u.tenantName})`);
  }
}
