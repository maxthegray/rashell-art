# RaShell Art — rebuilt site

Same look as the old site, but the gallery is now driven by data instead of a
hand-coded HTML table, and there's a visual admin so the gallery can be updated
without touching code.

## Files

```
index.html  about.html  gallery.html  contact.html
styles.css            All styling (shared)
gallery.js            Builds the grid + pop-up viewer from artworks.json
artworks.json         THE PICTURE LIST  (this is what you edit)
admin/index.html      The /admin editor (Sveltia CMS)
admin/config.yml       Editor configuration
images/               Logo, backgrounds, headers, portrait
images/gallery/       Artwork photos
SETUP.md              One-time hosting + login setup (do this once)
```

## Two ways to add / remove pictures

**Rachel — no code.** Go to `yoursite.com/admin`, sign in, and use the editor:
each artwork is a card with a Title, a Size, and an Image you can drag-and-drop
to upload. Add a card, delete a card, or drag to reorder, then click **Publish**.
The website updates automatically a minute or two later.

**Max — code.** Edit `artworks.json` and push to GitHub. Each entry:

```json
{ "title": "Coral Reef", "size": "24\" x 25\"", "file": "images/gallery/CoralReef.jpg" }
```

Both edit the same `artworks.json`, so the two workflows never conflict.

## How it fits together

- The site is fully static (plain HTML/CSS/JS) — nothing to run, no database.
- `gallery.js` fetches `artworks.json` in the browser and renders the grid and
  the click-to-enlarge viewer. No build step.
- The admin (Sveltia CMS) edits `artworks.json` and uploads images by committing
  to your GitHub repo. Cloudflare Pages redeploys the site on every commit.

See **SETUP.md** for the one-time hosting and login setup.

## Notes

- Local preview: run `python3 -m http.server` in this folder and open
  `http://localhost:8000` (opening the file directly blocks `artworks.json`).
- One entry, **"In the Window"**, had no image on the old server. Upload an image
  for it in the admin, or delete that card.
- Worth doing later: generate small thumbnails so the grid loads faster instead
  of downloading full-size images. Ask Max to add this.
