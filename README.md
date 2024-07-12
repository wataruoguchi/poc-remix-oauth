# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/

## Notes

- [Cloudflare > Pages > Framework Guides > Deploy a Remix Site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)
- [Implement SSO Authentication in Remix using GitHub and Remix Auth in Under 10 Minutes](https://www.telerik.com/blogs/implement-sso-authentication-remix-using-github-remix-auth-under-10-minutes)

### Create D1

- https://developers.cloudflare.com/d1/get-started/#3-create-a-database

### Install Drizzle

```sh
npm i drizzle-orm
npm i -D drizzle-kit
# Create drizzle.config.ts manually
# Create drizzle/schema.ts manually
npm run drizzle:gen # Automatically generates drizzle/0000_clear_joystick.sql
npm run d1:exec -- --file="drizzle/0000_clear_joystick.sql"
```
