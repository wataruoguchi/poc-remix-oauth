import { type ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { authenticator } from "../auth.server";

export async function loader() {
  return redirect("/login");
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("github", request, {
    successRedirect: "/protected",
  });
}
