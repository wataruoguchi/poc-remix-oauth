import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("github", request, {
    successRedirect: "/protected",
    failureRedirect: "/login",
  });
}
