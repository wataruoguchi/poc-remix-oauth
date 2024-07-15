import { drizzle } from "drizzle-orm/d1";
import { users } from "../app/schema";
import { mockUsers } from "./mockUsers";
import { seeder } from "./seeder";

seeder("poc-remix-oauth", "./dev-utils/seed.local.sql", [
  (d1: D1Database) => drizzle(d1).delete(users).toSQL(),
  (d1: D1Database) => drizzle(d1).insert(users).values(mockUsers).toSQL(),
]);
