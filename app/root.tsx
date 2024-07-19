import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { getTheme } from "./utils/theme.server";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { ThemeSwitch, useTheme } from "./routes/resources+/theme-switch";
import stylesheet from "~/tailwind.css?url";
import { setToast, ToastProvider } from "./components/ToastProvider";
import { Toast, ToastContent } from "./components/Toast";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = getTheme(request);
  return json({ theme });
}

export function Layout({
  children,
  env,
}: {
  children: React.ReactNode;
  env?: Record<string, string>;
}) {
  const theme = useTheme();
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
        <ToastProvider<ToastContent> renderToast={setToast(Toast)}>
          {(state) => (
            <button
              onClick={() =>
                state.add({
                  title: "Hello",
                  description: "World... here is more text",
                })
              }
            >
              Click
            </button>
          )}
        </ToastProvider>
        {children}
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
