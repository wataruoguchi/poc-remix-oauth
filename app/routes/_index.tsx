import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { db, Env } from "../db.server";

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
  const { fetchAllUsers } = db(context.env as Env);
  const users = await fetchAllUsers();
  return json({ users });
};

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
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
        <Form action="/auth/github" method="post">
          <button>Login with GitHub</button>
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
