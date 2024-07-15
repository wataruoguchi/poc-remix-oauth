import { drizzle } from "drizzle-orm/d1";
import { insertUserSchema, users } from "../app/schema";
import { mockUsers as _mockUsers } from "./mockUsers";
import { seeder } from "./seeder";

seeder("poc-remix-oauth", "./dev-utils/seed.local.sql", [
  (d1: D1Database) => drizzle(d1).delete(users).toSQL(),
  (d1: D1Database) => {
    const mockUsers = _mockUsers.map((mockUser) =>
      insertUserSchema.parse(mockUser)
    );
    return drizzle(d1).insert(users).values(mockUsers).toSQL();
  },
]);
