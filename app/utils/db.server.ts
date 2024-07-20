import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../schema";

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
    findUserByName: async (name: string) => {
      const [result] = await _db
        .select()
        .from(users)
        .where(sql`lower(${users.name}) = ${name}`);
      return result;
    },
    getUserById: async (id: string) => {
      const [result] = await _db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.id, id));
      return result;
    },
  };
}
