# Portfolio converted to Next.js

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Notes

- Original HTML/CSS/JS design was converted into a single-page Next.js app.
- Images are now inside `public/images`.
- Main interactivity (dark mode, mobile menu, skill tabs, project filtering, scroll fade) has been moved to React state/effects.
- The CV download button is currently a placeholder `#` because no `cv.pdf` was included in the ZIP. Add your PDF to `public/` and change the link if needed.
