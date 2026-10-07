# Project Rhapsody for LVMH

Dedicated source repository for the LVMH partnership presentation. Firebase
Hosting serves the website; GitHub Pages is not used.

## Hosting

- Live site: https://rhapsody-lvmh-partnership.web.app
- Custom domain: https://lvmh-partnership.projectrhapsody.com (DNS pending)
- Firebase project: `project-rhapsody-eb1bc`
- Dedicated site: `rhapsody-lvmh-partnership`
- DNS instructions: [DNS.md](DNS.md)

Install with `npm ci`, then deploy only this site:

```sh
firebase deploy --only hosting:rhapsody-lvmh-partnership --project project-rhapsody-eb1bc
```

The predeploy hook builds the static export. This command does not deploy the
main Rhapsody site or investor deck. Git pushes do not automatically deploy.
The presentation is publicly accessible. Noindex does not provide access control.

## Preview

`npm run dev -- --port 3196 --hostname 127.0.0.1`

For stable review, the current macOS login session runs a copy of `scripts/serve-preview.cjs` through launchd (`com.rhapsody.lvmh-preview`) on the same local address. It serves `/tmp/rhapsody-lvmh-review/out/`, not live source, avoiding iCloud and background access restrictions on Documents. After edits, run `npm run build`, then copy `out/` into `/tmp/rhapsody-lvmh-review/` to refresh the review snapshot. The service restarts if it exits and is not installed for future logins. Stop it with `launchctl bootout gui/$(id -u)/com.rhapsody.lvmh-preview`. Definition: `/tmp/com.rhapsody.lvmh-preview.plist`.

## Copy

Approved source: `../output/LVMH-Partnership-Copy-v5.md`.
`node scripts/prepare-copy.mjs` regenerates `lib/slides.json` for both web and PDF.
`npm run build:pdf` exports the `/print` route while the preview is running.

## Creative

Sections 01 through 10 use the supplied videos and images, with still posters
for PDF output. Sections 11 through 16 retain placeholder artwork. Media and
the current PDF are included in `public/`.

The investor deck remains unchanged. Components are copied from it and adapted only for the LVMH copy, navigation, and placeholders. Dependencies currently use a complete local cache at `/tmp/rhapsody-lvmh-deps/node_modules` to avoid iCloud-offloaded files; `npm ci` can create a standalone install later.
