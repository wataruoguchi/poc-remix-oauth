import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
});

// Intentionally not using `import.meta.env` because the app should be stateless.
const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 4)
  );
  throw new Error("Invalid environment variables");
}

export default parsed.data;
