import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";
import env from "../load-env";
import { sessionStorage } from "./session.server";

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5173/auth/github/callback",
  },
  async ({ accessToken, extraParams, profile }) => {
    console.log({ accessToken, extraParams });
    // Save/Get the user data from your DB or API using the tokens and profile
    return profile;
  }
);

export const authenticator = new Authenticator(sessionStorage);
authenticator.use(gitHubStrategy);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requireAnonymous = (_request: Request) => {
  // TODO
};
