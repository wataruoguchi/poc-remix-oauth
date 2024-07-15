import { drizzle } from "drizzle-orm/d1";
import { users } from "./schema";

export interface Env {
  DB: D1Database;
}

export function db(env: Env) {
  const _db = drizzle(env.DB);
  return {
    fetchAllUsers: async () => {
      const result = await _db.select().from(users).all();
      return result;
    },
  };
}
