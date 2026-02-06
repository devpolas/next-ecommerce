// lib/prisma.ts
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";
import ws from "ws";

// 1. Neon WebSocket Polyfill
if (typeof window === "undefined" && !globalThis.WebSocket) {
  neonConfig.webSocketConstructor = ws;
}

// 2. Global singleton for Dev (prevents connection exhaustion)
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// 3. Initialize Adapter with the POOLED connection string
if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
