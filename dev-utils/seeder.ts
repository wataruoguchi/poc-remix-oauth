import { exec } from "node:child_process";
import { GetQuery, queryGenerator } from "./query-generator";

export async function seeder(
  d1DatabaseName: string,
  sqlDistPath: string,
  getQueries: GetQuery[]
): Promise<void> {
  console.log("🌱 Seeding...");

  const seededMessage = `🌱 Database has been seeded`;
  console.time(seededMessage);
  return queryGenerator(sqlDistPath, getQueries)
    .then(() => {
      return exec(
        `npx wrangler d1 execute ${d1DatabaseName} --file="${sqlDistPath}"`
      );
    })
    .then(() => {
      console.timeEnd(seededMessage);
    });
}
