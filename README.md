# Koselig Homes website (demo)

React + TypeScript + Tailwind (Vite). Frontend only. Deploys on Vercel's free plan with no config.

## Run in VS Code
```
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## Photos and logo
- `npm run photos` downloads the 10 public Airbnb listing photos into `assets-original/` and writes optimised WebP files to `public/images/`. **Commit `public/images`** so Vercel serves them.
- Those photos belong to the host: get the owner's OK before launch. To use approved photos instead, save them as `r1-1.jpg` ... `r2-5.jpg` and run `npm run images`.
- Which photo fills which slot is set in `src/data.ts` (`slots`, plus alt text). Review and re-assign after the first run.
- No official logo was found online. The header and footer use a stand-in wordmark (`Logo` in `src/ui.tsx`) and `public/favicon.svg`; replace them with the real logo when supplied.

## Deploy
Push to GitHub and import in Vercel (framework: Vite). `vercel.json` handles page refreshes.

## Before launch
- Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`; add canonical and `og:image` tags in `index.html`.
- Work through `OWNER-CHECKLIST.md`. Content lives in `src/data.ts`.
