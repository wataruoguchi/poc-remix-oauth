import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { Button } from "@/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  // https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/
  const { env } = context.cloudflare;
  const { fetchAllUsers } = db(env);
  const users = await fetchAllUsers();
  return json({ users });
};

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome to Remix (with Vite and Cloudflare)</h1>
      {users.length > 0 && (
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <a href="/login">Go to Login page</a>
        <Form action="/auth/github" method="post">
          <Button>Login with GitHub</Button>
        </Form>
      </div>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
            rel="noreferrer"
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
