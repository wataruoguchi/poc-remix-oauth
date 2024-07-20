import { createCookieSessionStorage } from "@remix-run/cloudflare";
import env from "../../load-env";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: import.meta.env.NODE_ENV === "production",
    secrets: env.SESSION_SECRET.split(","),
  },
});
