import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useFetcher, useFetchers, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { invariantResponse } from "~/utils/misc";
import { SunMedium, Moon } from "lucide-react";
import { setTheme, type Theme } from "~/utils/theme.server";

const ThemeFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: ThemeFormSchema });
  invariantResponse(submission.status === "success", "Invalid theme received", {
    status: 400,
  });

  return json(
    { result: submission.reply() },
    {
      headers: {
        "set-cookie": setTheme(submission.value.theme),
      },
    }
  );
}

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  // https://remix.run/docs/en/main/hooks/use-fetcher
  const fetcher = useFetcher<typeof action>();

  // https://conform.guide/tutorial
  const [form] = useForm({
    id: "theme-switch",
    lastResult: fetcher.data?.result,
    constraint: getZodConstraint(ThemeFormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ThemeFormSchema });
    },
  });

  const mode = userPreference ?? "light";

  const modeLabel = {
    light: (
      <>
        <SunMedium />
        <span className="sr-only">Light</span>
      </>
    ),
    dark: (
      <>
        <Moon />
        <span className="sr-only">Dark</span>
      </>
    ),
  };

  return (
    <fetcher.Form
      method="post"
      {...getFormProps(form)}
      action="/resources/theme-switch"
    >
      <input
        type="hidden"
        name="theme"
        value={mode === "light" ? "dark" : "light"}
      />
      <button name="intent" value="update-theme" type="submit">
        {modeLabel[mode]}
      </button>
    </fetcher.Form>
  );
}

export function useTheme<T extends { theme: Theme }>() {
  const data = useLoaderData<T>();
  const fetchers = useFetchers();
  const fetcher = fetchers.find(
    (f) => f.formData?.get("intent") === "update-theme"
  );

  // Remix optimistic updates with the fetcher.
  const optimisticTheme = fetcher?.formData?.get("theme");
  if (optimisticTheme === "light" || optimisticTheme === "dark") {
    return optimisticTheme;
  }
  return data.theme;
}
