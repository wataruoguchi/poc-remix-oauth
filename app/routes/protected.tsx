import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../auth.server";
import { useLoaderData, Form } from "@remix-run/react";

type User = {
  displayName: string;
  _json: {
    followers: number;
    following: number;
  };
};
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json(user);
}

export default function Index() {
  const data = useLoaderData<User>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome {data.displayName}</h1>
      <ul>
        <li>You have {data._json.followers} followers</li>
        <li>You are following {data._json.following} people</li>
      </ul>
      <Form action="/logout" method="post">
        <button>Logout? Click me</button>
      </Form>
    </div>
  );
}
