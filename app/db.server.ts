import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "./schema";
export interface Env {
  DB: D1Database;
}

let _db: DrizzleD1Database;

export function db(env: Env) {
  _db = _db ?? drizzle(env.DB);
  return {
    fetchAllUsers: async () => {
      const result = await _db.select().from(users).all();
      return result;
    },
  };
}
