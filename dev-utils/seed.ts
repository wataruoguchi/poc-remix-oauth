import { drizzle } from "drizzle-orm/d1";
import { execSync } from "node:child_process";
import { seeder } from "seed-d1";
import { insertUserSchema, users } from "../app/schema";
import { mockUsers as _mockUsers } from "./mockUsers";

const databaseName = "poc-remix-oauth";
const sqlDistPath = "./dev-utils/seed.local.sql";

seeder(
  sqlDistPath,
  [
    (d1: D1Database) => drizzle(d1).delete(users).toSQL(),
    (d1: D1Database) => {
      const mockUsers = _mockUsers.map((mockUser) =>
        insertUserSchema.parse(mockUser)
      );
      return drizzle(d1).insert(users).values(mockUsers).toSQL();
    },
  ],
  async () => {
    const command = `npx wrangler d1 execute ${databaseName} --file="${sqlDistPath}"`;
    console.log(command);
    execSync(command, {
      encoding: "utf-8",
    });
  }
);
