import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.js";
import contractJson from "./contract.json" with { type: "json" };

const dbUrl = process.env["DATABASE_URL"] || "postgresql://postgres:postgres@localhost:5432/socialintel?sslmode=disable";

const client = postgres<Contract>({
  contractJson,
  url: dbUrl,
});

// Connect once when the backend starts with resilient error handling.
let runtime: any = null;
try {
  if (process.env["DATABASE_URL"]) {
    runtime = await client.connect();
    console.log("[SocialIntel] Database connected successfully.");
  } else {
    console.warn("[SocialIntel] DATABASE_URL not set in backend/.env. Using default local URL.");
  }
} catch (err: any) {
  console.warn("[SocialIntel] Warning: Database connection error:", err?.message || err);
}

export const db = client;
export { runtime };