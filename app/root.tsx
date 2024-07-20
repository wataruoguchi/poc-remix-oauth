import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getTheme } from "~/utils/theme.server";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { ThemeSwitch, useTheme } from "~/routes/resources+/theme-switch";
import stylesheet from "~/tailwind.css?url";
import { Toaster, toast } from "sonner";
import { csrf } from "./utils/csrf.server";
import { combineHeaders } from "./utils/misc";
import { honeypot } from "./utils/honeypot.server";
import { sessionStorage } from "./utils/session.server";
import { db } from "./utils/db.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  const honeyProps = honeypot.getInputProps();
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const userId = cookieSession.get("userId");
  const user = userId
    ? await db(context.cloudflare.env).getUserById(userId)
    : null;
  return json(
    { theme: getTheme(request), user, csrfToken, honeyProps },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null
      ),
    }
  );
}

export function Layout({
  children,
  env,
}: {
  children: React.ReactNode;
  env?: Record<string, string>;
}) {
  const theme = useTheme();
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en" className={`${theme}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <ThemeSwitch userPreference={theme} />
        {data.user && <div>Hello, {data.user.name}!</div>}
        <button onClick={() => toast("Hello World")}>Click</button>
        <AuthenticityTokenProvider token={data.csrfToken}>
          <HoneypotProvider {...data.honeyProps}>{children}</HoneypotProvider>
        </AuthenticityTokenProvider>
        <Toaster position="top-right" />
        {env && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(env)}`,
            }}
          />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
