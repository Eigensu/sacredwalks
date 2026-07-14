# Sacred Walks — Frontend

A [Next.js](https://nextjs.org) site with a built-in CMS. The public site
(homepage + yatra pages) renders content stored in MongoDB, falling back to
the defaults in `src/lib/content.ts` when no database is configured.

## Features

- **Enquiry form** — submissions are saved to the `enquiries` collection in MongoDB.
- **Newsletter signup** (footer) — emails saved to the `subscribers` collection.
- **WhatsApp button** — floating button on every page; the number and pre-filled
  message are editable in the admin panel.
- **Landing page video** — self-hosted video section on the homepage; upload an
  MP4 through the admin panel (stored in MongoDB GridFS) or paste a video URL.
- **Admin panel at `/admin`** — password-protected CMS to edit all site text,
  images, video, WhatsApp settings, and the yatras (including itineraries), plus
  tables of all enquiries and newsletter subscribers.

## Setup

1. Copy the env template and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   | Variable               | Purpose                                                                                                                                                                |
   | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `MONGODB_URI`          | MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas) — a free M0 cluster works). Without it the site runs read-only on default content. |
   | `MONGODB_DB`           | Database name (optional, default `sacredwalks`).                                                                                                                       |
   | `ADMIN_PASSWORD`       | Password for `/admin`. Required for admin access.                                                                                                                      |
   | `ADMIN_SESSION_SECRET` | Long random string used to sign admin session cookies (optional but recommended).                                                                                      |

2. Run the dev server:

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) for the site and
   [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

No seeding is needed — the site ships with default content, and the first
"Save changes" in the admin panel writes the content document to MongoDB.

## Notes

- Uploaded media is stored in GridFS and served from `/api/media/<id>`.
  Uploads are capped at 64 MB in the app; some hosts (e.g. Vercel) limit
  request bodies to ~4.5 MB, in which case host large videos externally and
  paste the URL in the admin panel instead.
- Collections used: `content` (single site-content document), `enquiries`,
  `subscribers`, `media.files` / `media.chunks` (GridFS).
