# Metro Performance Dashboard — Restructured Project

This is the original single-file `final_refund_dashboard.html` (2.7 MB,
~94,364-row dataset baked in as a compressed blob) split into a
maintainable multi-file project, wired up to load its data live from a
Google Sheet via a Google Apps Script API. **See `docs/SETUP.md` for
step-by-step setup and deployment instructions — read that first.**

## What changed, and why

**1. Split into files, by concern:**

| File | What it holds |
|---|---|
| `index.html` | Page shell only — no inline CSS/JS |
| `css/style.css` | All styling (unchanged, just extracted) |
| `js/vendor/*.js` | Chart.js, SheetJS (xlsx), pako — unmodified, just externalized |
| `js/data-core.js` | Star-schema engine, filters, aggregation helpers — **plus a new live-data loader** (see below) |
| `js/data-upload.js` | The existing "upload a new Excel export" feature — unchanged, still works as a manual fallback |
| `js/app.js` | UI shell, router, charts, drill-through — unchanged except `boot()` now awaits live data instead of decompressing an embedded blob |
| `config.js` | **The one file you edit after deployment** — your Apps Script URL and refresh interval |
| `apps-script/Code.gs` | The new Google Apps Script backend |
| `data/sdr_bi_export.csv` | Your current 94,364-row dataset, flattened, ready to paste into the Google Sheet |

**2. Removed the hardcoded data.** The original file's `EMBEDDED_DATA_B64`
constant (a gzip+base64 blob of your entire dataset, ~1.68 MB of the
file's 2.7 MB) and the `decompressEmbedded()` function that inflated it
are gone. Nothing else reads a baked-in dataset anymore.

**3. Added a live Google Sheets → Apps Script → dashboard pipeline.**
Rather than inventing a new data format, `Code.gs` mirrors the exact
transform your dashboard's *existing* "Upload new data" feature already
performs client-side (`parseWorkbookToPayload` in `js/data-upload.js`):
same column-alias matching, same star-schema shape (`{meta, dims,
fact}`). That means:
- Every existing chart, filter, table, and drill-through page keeps
  working exactly as-is — they all consume `DB.dims` / `DB.fact` the
  same way they always did, in `loadPayloadObject()`.
- The manual "Upload new data" feature still works too, unchanged, as a
  local override/fallback if you ever want to preview a file before it's
  in the Sheet.

**4. Auto-refresh, three layers deep:**
- The Apps Script cache rebuilds on a timer and whenever the sheet is
  edited (installed by `runInitialSetup`).
- The dashboard re-fetches from the API on every page load, and again
  every `CONFIG.REFRESH_INTERVAL_MINUTES` while a tab stays open.
- A locally-cached copy (in the browser) keeps the dashboard usable if
  the API is briefly unreachable.

## What did *not* change

- UI, layout, colors, charts, filters, tables, and every drill-through
  page — byte-for-byte the same rendering code as the original file.
- The manual Excel-upload/replace feature.
- The star-schema data shape (`dims` + indexed `fact` rows) that all the
  rendering/aggregation code depends on.

## Next steps

Follow `docs/SETUP.md` to: import `data/sdr_bi_export.csv` into a Google
Sheet, paste in `Code.gs`, deploy it as a Web App, drop the URL into
`config.js`, and push the folder to GitHub Pages (or any static host).
