# Horsorion Website — Deployment & Setup Guide

> Reference manual for the `Horsorion Website Revamp` project.
> Use this as the master playbook when redeploying, hand-off, or replicating
> this stack for another site.
>
> Stack at a glance:
>
> | Layer       | Tech                                                        |
> |-------------|-------------------------------------------------------------|
> | Frontend    | Astro 5 + React 19 + TailwindCSS 3 (static SSG)             |
> | Hosting     | GitHub Pages (custom domain `www.horsorion.com`)            |
> | Lead form   | Cloudflare Worker (`workers/lead.ts`) — free tier           |
> | Email       | Resend API (transactional)                                  |
> | CRM mirror  | Notion (optional)                                           |
> | Analytics   | Google Analytics 4                                          |
> | CI/CD       | GitHub Actions (`.github/workflows/deploy.yml`)             |
> | Source      | GitHub repo `Horsorion/horsorion.github.io` (branch `main`) |

---

## 0. High-level architecture

```
┌────────────┐  POST JSON    ┌────────────────────────┐  Resend API   ┌──────────────────┐
│  Browser   │──────────────▶│  Cloudflare Worker     │──────────────▶│  horsorion@gmail │
│  (Astro)   │  CORS *       │  horsorion-lead        │               └──────────────────┘
└────────────┘               │  (workers/lead.ts)     │  Resend API   ┌──────────────────┐
       ▲                     │                        │──────────────▶│  user confirm    │
       │ static assets        │  best-effort: also    │               └──────────────────┘
       │                     │  appends row to Notion │  Notion API   ┌──────────────────┐
┌────────────┐  push main     │  (if env set)          │──────────────▶│  Notion DB       │
│ GitHub Repo│──────┐         └────────────────────────┘               └──────────────────┘
└────────────┘     ▼
              ┌──────────────────────┐  artefact   ┌────────────────────┐
              │ GitHub Actions       │────────────▶│ GitHub Pages       │
              │ deploy.yml           │             │ www.horsorion.com  │
              └──────────────────────┘             └────────────────────┘
```

---

## 1. Prerequisites

| Tool              | Version             | Notes                                                         |
|-------------------|---------------------|---------------------------------------------------------------|
| Windows / macOS   | any modern          | Steps written for Windows 10/11 + PowerShell + Git Bash       |
| Node.js           | **22.x** or higher  | `wrangler` requires ≥ 22. `.nvmrc` already pins `22`.         |
| npm               | bundled with Node   | Used to install Astro & Wrangler                              |
| Git               | latest              | Required for GitHub Actions workflow                          |
| GitHub account    | —                   | Repo: `Horsorion/horsorion.github.io`                         |
| Cloudflare        | free                | For the Worker hosting the lead form                          |
| Resend            | free                | For sending lead notification + user confirmation             |
| Google Analytics  | free                | GA4 property for the live domain                              |
| Notion (optional) | free                | Mirror leads to a Notion DB                                   |

Verify versions:

```powershell
node -v          # should print v22.x.x
npm -v
git --version
```

If Node is < 22, install from <https://nodejs.org/> (LTS 22) or use `nvm-windows`.

---

## 2. Repository layout

```
Horsorion Website Revamp/
├── .github/workflows/deploy.yml    # CI — build & publish to GitHub Pages
├── .nvmrc                          # 22  (used by GitHub Actions cache)
├── .gitignore                      # ignores .env, node_modules, dist
├── deployment.md                   # ← this file
└── site/
    ├── .env                        # local-only; never commit
    ├── .env.example                # committed; documents required vars
    ├── package.json                # engines.node ">=22.0.0"
    ├── astro.config.mjs
    ├── public/                     # static assets (images, samples, llms.txt)
    │   ├── images/brand/logo.jpg   # navbar logo
    │   ├── samples/horsorion-sample-2025-07-16.csv
    │   └── llms.txt
    ├── src/
    │   ├── pages/                  # zh-Hant pages at root, en/* mirrors English
    │   ├── components/             # WhatsAppFab, Header, Footer, LeadCaptureModal, …
    │   ├── lib/
    │   │   ├── i18n.ts             # bilingual copy
    │   │   └── whatsapp.ts         # central WhatsApp link helper
    │   └── layouts/BaseLayout.astro
    └── workers/
        ├── wrangler.toml           # Worker config + non-secret vars
        └── lead.ts                 # the Worker (lead handler)
```

---

## 3. First-time local setup

### 3.1 Clone the repo

```powershell
cd "C:\Users\<you>\Documents\Projects"
git clone https://github.com/Horsorion/horsorion.github.io.git "Horsorion Website Revamp"
cd "Horsorion Website Revamp"
```

> If you already have an unrelated folder, do `git init` then
> `git remote add origin https://github.com/Horsorion/horsorion.github.io.git`,
> commit, and push.

### 3.2 Install dependencies

```powershell
cd site
npm install
```

This installs Astro, React, Tailwind, Wrangler (≥ 4.91.0), Zod, etc.

### 3.3 Create local `.env` files

Copy the template:

```powershell
Copy-Item site\.env.example site\.env
```

Then fill in `site/.env`:

```env
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX                                    # your GA4 ID, leave blank to disable
PUBLIC_LEAD_ENDPOINT=https://horsorion-lead.horsorion.workers.dev        # full URL of the deployed Worker
```

> `.env` is in `.gitignore`. **Never commit it.**

### 3.4 Local dev

```powershell
cd site
npm run dev          # Astro dev server at http://localhost:4321
npm run check        # type/Astro diagnostics
npm run build        # production build → site/dist
npm run preview      # serve dist locally
```

For local Worker development:

```powershell
cd site
npm run worker:dev   # wrangler dev — needs RESEND_API_KEY in worker secrets
```

---

## 4. Cloudflare Worker (lead form backend)

The Worker at `site/workers/lead.ts` accepts the lead form POST, sends two
emails via Resend (notify inbox + user confirm), optionally appends to Notion,
and **always returns `200 OK`** — failures are listed in `errors[]` for
debugging without breaking the user experience.

### 4.1 Cloudflare account setup

1. Sign up free at <https://dash.cloudflare.com/sign-up>.
2. From the dashboard you don't need to do anything in the UI yet —
   Wrangler will create the Worker on first deploy.

### 4.2 Login wrangler locally

```powershell
cd site
npx wrangler login
```

A browser opens for OAuth. Approve.

### 4.3 Set the Resend API key as a Worker secret

```powershell
cd site
npx wrangler secret put RESEND_API_KEY --config workers/wrangler.toml
# Paste the key when prompted (re_xxxxxxxxxxxxxxxxx)
```

> Secrets are encrypted on Cloudflare; not visible in the dashboard.
> Only the Worker can read them via `env.RESEND_API_KEY`.

### 4.4 Non-secret vars (in `workers/wrangler.toml`)

```toml
name = "horsorion-lead"
main = "lead.ts"
compatibility_date = "2024-11-01"

[vars]
LEAD_TO_EMAIL  = "horsorion@gmail.com"
LEAD_FROM_EMAIL = "Horsorion <onboarding@resend.dev>"
```

> **Why `onboarding@resend.dev`?**
> Resend free tier rejects sends from a custom domain until that domain is
> DNS-verified. `onboarding@resend.dev` works out of the box. To use
> `noreply@horsorion.com`, see §5.2.

### 4.5 (Optional) Notion CRM mirror

```powershell
cd site
npx wrangler secret put NOTION_TOKEN       --config workers/wrangler.toml
npx wrangler secret put NOTION_DATABASE_ID --config workers/wrangler.toml
```

Database must have these properties: `Name` (title), `Company` (text),
`Intent` (text), `Locale` (text). If unset, the Worker silently skips Notion.

### 4.6 Deploy the Worker

```powershell
cd site
npm run worker:deploy
```

You'll see:

```
Deployed horsorion-lead triggers
  https://horsorion-lead.horsorion.workers.dev
```

Copy that URL — it becomes `PUBLIC_LEAD_ENDPOINT`.

### 4.7 Smoke test the Worker

PowerShell:

```powershell
Invoke-RestMethod -Method POST `
  -Uri "https://horsorion-lead.horsorion.workers.dev/" `
  -ContentType "application/json" `
  -Body '{"name":"Test","email":"horsorion@gmail.com","intent":"test","locale":"zh-Hant","website":""}'
```

Expected response:

```json
{ "ok": true, "errors": [] }
```

If `errors[]` is non-empty, see §5 (Resend) or §10 (troubleshooting).

### 4.8 Live logs

```powershell
cd site
npx wrangler tail --config workers/wrangler.toml
```

This streams every request + thrown errors. Useful when debugging from
production.

---

## 5. Resend (email)

### 5.1 Create account & API key

1. Sign up at <https://resend.com>.
2. **API Keys** → **Create API Key** → name it `horsorion-worker` →
   permission **Sending access**.
3. Copy the `re_…` key into the Worker secret (§4.3).

### 5.2 (Optional but recommended) Verify your sending domain

To send from `noreply@horsorion.com` instead of `onboarding@resend.dev`:

1. Resend dashboard → **Domains** → **Add Domain** → `horsorion.com`.
2. Resend will show DNS records (SPF `TXT`, DKIM `TXT`, optional `MX` for
   feedback). Add them at your DNS host (Cloudflare or your registrar).
3. Wait for status to turn **Verified** (usually < 30 minutes).
4. Update `LEAD_FROM_EMAIL` in `workers/wrangler.toml`:

   ```toml
   LEAD_FROM_EMAIL = "Horsorion <noreply@horsorion.com>"
   ```

5. Redeploy the Worker (`npm run worker:deploy`).

### 5.3 Free-tier limits

- 100 emails/day, 3 000/month free.
- For higher volumes, upgrade Resend or batch confirmation emails.

---

## 6. Frontend hosting (GitHub Pages + Actions)

### 6.1 Enable GitHub Pages

1. GitHub repo → **Settings → Pages**.
2. **Source**: `GitHub Actions` (NOT "Deploy from branch").
3. Custom domain: `www.horsorion.com` (auto-creates `CNAME` file in `dist`).
4. Wait for the green tick "Your site is live at https://www.horsorion.com".

### 6.2 Allow `main` to deploy

If the workflow fails with
`Branch "main" is not allowed to deploy to github-pages due to environment protection rules`:

1. **Settings → Environments → github-pages → Deployment branches and tags**.
2. Add rule for `main` (or remove protection).

### 6.3 Workflow file (committed)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy Horsorion site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: site/package-lock.json
      - run: npm ci
        working-directory: site
      - run: npm run build
        working-directory: site
        env:
          PUBLIC_LEAD_ENDPOINT: ${{ secrets.PUBLIC_LEAD_ENDPOINT }}
          PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.PUBLIC_GA_MEASUREMENT_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 6.4 GitHub repo secrets

**Settings → Secrets and variables → Actions → New repository secret**.
Anything prefixed `PUBLIC_` is baked into the static bundle (visible to
browser); anything else stays server-only.

| Secret name                 | Example value                                            | Used by                          |
|-----------------------------|----------------------------------------------------------|----------------------------------|
| `PUBLIC_LEAD_ENDPOINT`      | `https://horsorion-lead.horsorion.workers.dev`           | Astro build (form posts here)    |
| `PUBLIC_GA_MEASUREMENT_ID`  | `G-XXXXXXXXXX`                                           | Astro build (GA snippet)         |

> Without `PUBLIC_LEAD_ENDPOINT` the form submits to nothing.
> Without `PUBLIC_GA_MEASUREMENT_ID` the GA `<script>` is omitted (privacy-safe).

### 6.5 Trigger a deploy

```powershell
git add -A
git commit -m "Deploy: <what changed>"
git push origin main
```

Watch the run at **Actions** tab. Two jobs: `build` then `deploy`. After
green, refresh `https://www.horsorion.com`.

---

## 7. Custom domain (DNS)

`www.horsorion.com` is already pointing at GitHub Pages. To replicate for a
new domain:

1. At your registrar / Cloudflare DNS:
   - `A` records for the apex domain → GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `CNAME` for `www` → `<your-org>.github.io`.
2. Repo **Settings → Pages → Custom domain** → enter the apex/www domain.
3. Tick **Enforce HTTPS** once the cert provisions (5–30 min).

---

## 8. Google Analytics (GA4)

1. <https://analytics.google.com> → **Admin → Data Streams → Add stream → Web**.
2. Stream URL `https://www.horsorion.com`, name `Horsorion Production`.
3. Copy **Measurement ID** (`G-XXXXXXXXXX`).
4. Repo **Settings → Secrets and variables → Actions** → add
   `PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX`.
5. Add the same value to your local `site/.env` (only if you want analytics
   in `npm run dev`).
6. Push any commit to `main` → CI rebuilds with GA wired in.
7. Verify in GA → **Reports → Realtime**: visit the live site, you should see
   a session within 30 s.

> The GA `<script>` is rendered conditionally in `BaseLayout.astro` —
> if `PUBLIC_GA_MEASUREMENT_ID` is empty, no analytics code is shipped.

---

## 9. WhatsApp link convention

Use the central helper at `site/src/lib/whatsapp.ts` instead of hard-coding
`wa.me` or `api.whatsapp.com` URLs everywhere:

```ts
import { getWhatsappHref } from "@/lib/whatsapp";

const href = getWhatsappHref();                                    // generic chat
const ndaHref = getWhatsappHref("Hi Horsorion, NDA enquiry");      // pre-filled message
```

Output format:

```
https://api.whatsapp.com/send/?phone=85296005554&type=phone_number&app_absent=0
```

`api.whatsapp.com` is more reliable than `wa.me` on desktop & some HK ISPs.
To change the business number, edit the constant `WHATSAPP_PHONE` in
`site/src/lib/whatsapp.ts` (E.164 without `+`).

---

## 10. Day-2 operations

### 10.1 Update site content

Edit any `.astro` / `.ts` under `site/src/`, then:

```powershell
cd site
npm run check
npm run build      # local sanity check
git add -A
git commit -m "Update: <what>"
git push           # CI auto-deploys
```

### 10.2 Update the Worker (lead handler)

```powershell
cd site
# edit workers/lead.ts
npm run worker:deploy
```

Worker updates take effect within ~10 seconds globally.

### 10.3 Rotate the Resend API key

1. Resend dashboard → revoke old key, create new one.
2. `cd site && npx wrangler secret put RESEND_API_KEY --config workers/wrangler.toml`
3. `npm run worker:deploy` (not strictly required — secrets reload — but safe).

### 10.4 Change the recipient email

Edit `LEAD_TO_EMAIL` in `workers/wrangler.toml` and redeploy the Worker.

### 10.5 Add a new sample CSV

1. Drop the file in `site/public/samples/`.
2. Update references in `site/src/pages/{index,data,resources,thank-you,open-data}.astro`
   (and the `en/` mirrors).
3. Update JSON-LD `sampleUrl` / `temporal*` in `site/src/pages/open-data.astro`.

---

## 11. Troubleshooting log (issues we hit & fixes)

| Symptom                                                                              | Root cause                                                                                       | Fix                                                                                                                                                          |
|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Wrangler requires at least Node.js v22.0.0. You are using v20.x`                    | Node version too old.                                                                            | Install Node 22 LTS. We pinned `engines.node >=22.0.0` and added `.nvmrc` = `22`.                                                                            |
| GitHub Actions: `Branch "main" is not allowed to deploy to github-pages …`           | Environment protection rules.                                                                    | Settings → Environments → github-pages → allow `main`.                                                                                                       |
| `bash: $'\377\376export': command not found` in Git Bash                             | A shell rc file saved as UTF-16 with BOM.                                                        | Re-save the rc file as UTF-8 (no BOM) in VS Code, restart terminal.                                                                                          |
| `git branch -M main` fails after `git init`                                          | No commit yet → no branch to rename.                                                             | Use `git checkout -b main`, then commit, then push.                                                                                                          |
| Form returns `400 Bad Request`                                                       | Worker `isValidLead()` was too strict (required all optional fields).                            | Loosened to `name + email + !website` only (see `workers/lead.ts`).                                                                                          |
| Form returns `500` then `403 Resend`                                                 | Resend rejected the request because `horsorion.com` was not a verified sending domain.           | Switched `LEAD_FROM_EMAIL` to `onboarding@resend.dev` (works out of the box). For prod-grade, verify domain in Resend (§5.2).                                |
| Form returns `200` but no email arrives                                              | Same root cause — Worker now swallows Resend errors and returns 200 with `errors[]` populated.   | Inspect the response body's `errors` array, or `npx wrangler tail`. Typical fix: switch from `noreply@horsorion.com` → `onboarding@resend.dev` until verified.|
| `failed to load response data — no resource with given identifier found` (DevTools)  | Browser was redirecting to `/thank-you` before DevTools could capture the XHR.                   | Use `Invoke-RestMethod` / `curl` from terminal, or check `wrangler tail` logs.                                                                               |
| `curl ... -d '{...}'` on Windows CMD says `not valid JSON`                           | CMD doesn't strip single quotes; Worker received the raw `'{...}'`.                              | Use `Invoke-RestMethod` (PowerShell) or escape with `\"` in CMD, or use Git Bash.                                                                            |
| Homepage background looked like an MP4 but client wanted JPG                         | We had `<video>` element with poster fallback.                                                   | Replaced `<video>` with `<img src="/images/background/home_powerby.jpeg">` on both zh + en homepages.                                                         |
| GA secret added but not appearing in built site                                      | `deploy.yml` `env:` block was missing `PUBLIC_GA_MEASUREMENT_ID`.                                | Added `PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.PUBLIC_GA_MEASUREMENT_ID }}` to the `npm run build` step.                                                       |
| WhatsApp `wa.me/85296005554` link wouldn't open on some browsers                     | `wa.me` short link can be unreliable on desktop / certain networks.                              | Created `site/src/lib/whatsapp.ts` returning `https://api.whatsapp.com/send/?phone=…&type=phone_number&app_absent=0`. Updated all references.                |

---

## 12. Reusing this stack for another website

Bare-minimum checklist to clone this architecture for `othersite.com`:

1. **Repo & site source**
   - Create `othersite/othersite.github.io` repo on GitHub.
   - Copy `site/`, `.github/workflows/deploy.yml`, `.nvmrc`, `.gitignore`,
     `deployment.md` (this file) into the new repo.
   - Update brand strings, copy, images, schema.org JSON-LD.

2. **Cloudflare Worker**
   - In `workers/wrangler.toml`: rename `name = "othersite-lead"`, set
     `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.
   - `npx wrangler login` → `wrangler secret put RESEND_API_KEY` → `wrangler deploy`.
   - Note the new `*.workers.dev` URL.

3. **Resend**
   - Create new API key, optionally verify the new sending domain.

4. **Google Analytics**
   - New GA4 stream → grab Measurement ID.

5. **GitHub repo secrets**
   - `PUBLIC_LEAD_ENDPOINT` (Worker URL) + `PUBLIC_GA_MEASUREMENT_ID`.

6. **GitHub Pages**
   - Settings → Pages → Source: GitHub Actions.
   - Custom domain + DNS records (apex A + www CNAME).
   - Allow `main` in github-pages environment if needed.

7. **First deploy**
   - `git push origin main` → wait for green CI → load the domain.

8. **Smoke test the lead form** via PowerShell `Invoke-RestMethod` (§4.7).

---

## 13. Useful commands cheat-sheet

```powershell
# Local dev
cd site; npm run dev

# Type & content checks
cd site; npm run check

# Production build (mimics CI)
cd site; npm run build
cd site; npm run preview

# Worker
cd site; npm run worker:dev
cd site; npm run worker:deploy
cd site; npx wrangler tail --config workers/wrangler.toml
cd site; npx wrangler secret put RESEND_API_KEY --config workers/wrangler.toml

# Lead form smoke test
Invoke-RestMethod -Method POST `
  -Uri "https://horsorion-lead.horsorion.workers.dev/" `
  -ContentType "application/json" `
  -Body '{"name":"Test","email":"horsorion@gmail.com","intent":"test","locale":"zh-Hant","website":""}'

# Git
git status
git add -A
git commit -m "msg"
git push origin main
```

---

## 14. Security notes

- **Never commit `.env`** — it's in `.gitignore` for both root and `site/`.
- **Rotate** `RESEND_API_KEY` if a contributor leaves; rotate the Postgres /
  Unsplash credentials in `Horsorion Website Revamp/.env` too (out of scope
  for this site, but they live in this folder).
- The Worker uses `Access-Control-Allow-Origin: *` for simplicity. To lock
  it down, change to `https://www.horsorion.com` in `corsHeaders`
  (`workers/lead.ts`).
- All form input is HTML-escaped (`escapeHtml`) before being included in
  notification emails to prevent HTML injection.

---

## 15. Last verified deploy state (2026-05-15)

- Frontend: GitHub Actions run `main` → `https://www.horsorion.com`.
- Worker: `horsorion-lead` Version `8…` deployed, `errors: []` on smoke test.
- Resend: sending from `Horsorion <onboarding@resend.dev>` to
  `horsorion@gmail.com`.
- GA4: `PUBLIC_GA_MEASUREMENT_ID` wired through CI.
- Logo: `site/public/images/brand/logo.jpg` (44×44 in navbar).
- WhatsApp: helper `site/src/lib/whatsapp.ts` used everywhere.

---

_End of `deployment.md` — update the "Last verified" section every time you
ship a meaningful infra change._