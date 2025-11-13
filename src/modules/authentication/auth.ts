import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getDatabaseConfig } from "@/modules/database/config";

const { provider, prisma } = getDatabaseConfig();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider }),
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
