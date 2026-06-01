# Setup — do this once

Goal: the site lives in a GitHub repo, deploys automatically on Cloudflare Pages,
and Rachel can log in at `/admin` to manage the gallery. All free.

There are three parts: **(1) repo + hosting**, **(2) login (GitHub OAuth via a
Cloudflare Worker)**, **(3) give Rachel access**.

---

## 1. Repo + hosting (Cloudflare Pages)

1. Put this folder in a GitHub repository (e.g. `maxthegray/rashell-art`).
2. Go to Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**,
   and pick the repo.
3. Build settings: **Framework preset = None**, **Build command = (leave empty)**,
   **Output directory = `/`** (the site is already plain static files).
4. Deploy. You'll get a `*.pages.dev` URL. Point your real domain at it later in
   Cloudflare → the Pages project → **Custom domains**.

Every push to the `main` branch now redeploys the site automatically.

## 2. Login (GitHub OAuth via a Cloudflare Worker)

Sveltia/Decap edit content by committing to GitHub, so logging in means
"sign in with GitHub." A tiny Cloudflare Worker brokers that securely.

1. Deploy the authenticator Worker — follow the README (it has a one-click
   deploy button): <https://github.com/sveltia/sveltia-cms-auth>.
   After deploy, copy the Worker URL, e.g.
   `https://sveltia-cms-auth.<your-subdomain>.workers.dev`.
2. Register a GitHub OAuth app: GitHub → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**.
   - **Homepage URL:** your site URL.
   - **Authorization callback URL:** the Worker URL **+ `/callback`**.
   - Save, then copy the **Client ID** and generate a **Client secret**.
3. In the Worker's settings (Cloudflare → the Worker → **Settings → Variables**),
   add environment variables:
   - `GITHUB_CLIENT_ID` = your Client ID
   - `GITHUB_CLIENT_SECRET` = your Client secret
   - `ALLOWED_DOMAINS` = your site's hostname (e.g. `rashellart.com`)
4. Open **`admin/config.yml`** in this repo and set:
   - `repo:` to your `username/repo`
   - `branch:` to `main`
   - `base_url:` to the Worker URL from step 1
   Commit the change.

Now visiting `yoursite.com/admin` shows a **Sign in with GitHub** button.

## 3. Give Rachel access

The GitHub backend lets anyone with **write access to the repo** edit content.

1. Have Rachel create a free GitHub account (one time).
2. In the repo → **Settings → Collaborators** → invite her username with
   **Write** access. She accepts the email invite.
3. She goes to `yoursite.com/admin`, clicks **Sign in with GitHub**, approves once,
   and she's in. She never sees code — only the gallery editor.

You stay the owner/admin; she's a collaborator scoped to editing content.

---

### Alternative if you'd rather Rachel never touch GitHub

Use **Decap CMS + DecapBridge** instead, which gives her an email/password login
(like the old Netlify Identity) with no GitHub account. Swap the script tag in
`admin/index.html` to Decap and follow <https://decapbridge.com>. Slightly more
setup on your end; gentler for a non-technical user. The GitHub-collaborator
route above is simpler to set up and is what I'd start with.
