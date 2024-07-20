import { createCookieSessionStorage } from "@remix-run/cloudflare";
import env from "../load-env";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [env.SESSION_SECRET], // replace this with an actual secret
    secure: import.meta.env.PROD, // enable this in prod only
  },
});
