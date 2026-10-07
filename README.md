# Project Rhapsody for LVMH

Separate local review deck. Nothing here is configured for deployment.

## Preview

`npm run dev -- --port 3196 --hostname 127.0.0.1`

For stable review, the current macOS login session runs a copy of `scripts/serve-preview.cjs` through launchd (`com.rhapsody.lvmh-preview`) on the same local address. It serves `/tmp/rhapsody-lvmh-review/out/`, not live source, avoiding iCloud and background access restrictions on Documents. After edits, run `npm run build`, then copy `out/` into `/tmp/rhapsody-lvmh-review/` to refresh the review snapshot. The service restarts if it exits and is not installed for future logins. Stop it with `launchctl bootout gui/$(id -u)/com.rhapsody.lvmh-preview`. Definition: `/tmp/com.rhapsody.lvmh-preview.plist`.

## Copy

Approved source: `../output/LVMH-Partnership-Copy-v5.md`.
`node scripts/prepare-copy.mjs` regenerates `lib/slides.json` for both web and PDF.
`npm run build:pdf` exports the `/print` route while the preview is running.

## Creative

Slide 01 uses the supplied Project Rhapsody sizzle film, optimized for muted background playback without trimming. Its PDF cover uses a still at 00:07. Remaining sections retain FPO slots. Supply assets labeled 02 through 16, matching `lib/slides.json`. The inherited `StickyMediaSection` accepts `imgUrl`, `mobileImgUrl`, `videoUrl`, `webmUrl`, and `posterUrl`. The opening uses `ApertureHero`. No stock, generated or investor creative is included.

The investor deck remains unchanged. Components are copied from it and adapted only for the LVMH copy, navigation, and placeholders. Dependencies currently use a complete local cache at `/tmp/rhapsody-lvmh-deps/node_modules` to avoid iCloud-offloaded files; `npm ci` can create a standalone install later.
