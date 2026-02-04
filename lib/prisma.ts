import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";
import ws from "ws";

/**
 * Neon requires WebSockets in Node.js
 */
neonConfig.webSocketConstructor = ws;

/**
 * Global singleton (prevents connection leaks in dev)
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

/**
 * Prisma Neon Adapter
 */
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Prisma Client
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
