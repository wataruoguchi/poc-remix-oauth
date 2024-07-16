import cookie from "cookie";

export type Theme = "light" | "dark";

const cookieName = "theme";
export function getTheme(request: Request): Theme {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader
    ? cookie.parse(cookieHeader)[cookieName]
    : "light";
  if (parsed === "light" || parsed === "dark") {
    return parsed;
  }
  return "light";
}

export function setTheme(theme: Theme) {
  return cookie.serialize(cookieName, theme, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
}
