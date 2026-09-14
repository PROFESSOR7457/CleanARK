# CleanArk Website

A 5-page website for CleanArk (laundry & dry-cleaning, Noida), built with plain HTML, CSS and JavaScript — no build tools, no frameworks, no npm install required. Just open the files in a browser (or upload the folder to any web host) and it works.

## How to view it

Because the pages load JavaScript files (`js/config.js`, `js/site.js`), some browsers restrict local file access slightly. Two options:

1. **Just double-click `index.html`** — this works fine in most browsers (Chrome, Edge, Firefox) for this site since everything is loaded via `<script src="...">` tags, not `fetch()`.
2. **Or run a tiny local server** (recommended while editing, and required by some browser security settings):
   ```
   cd cleanark
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000/index.html`.

## File structure

```
cleanark/
├── index.html          Home page
├── services.html        Full services list
├── pricing.html         Pricing table
├── about.html            About / story / stats
├── contact.html          Contact info + booking form
├── css/
│   └── style.css        ALL styling for every page (colors, layout, components)
├── js/
│   ├── config.js         ⭐ THE FILE YOU EDIT — all text, prices, contact info, images
│   └── site.js           The engine that reads config.js and fills in the pages (you shouldn't need to touch this)
└── images/
    ├── logo.png, favicon-*.png   Your CleanArk logo, trimmed and resized
    └── logo-source.jpg           Your original uploaded logo file (kept for reference)
```

## The most important idea: edit `js/config.js`, not the HTML

Every page loads `js/config.js` and then `js/site.js` fills the page with that data automatically. This means:

- **Change your phone number once** in `config.js` → it updates in the header, footer, contact page, and every WhatsApp button on all 5 pages.
- **Add a new service** to the `services` array in `config.js` → it automatically appears on the homepage preview AND gets its own full card on `services.html` AND gets added as an option in the booking form dropdown. You never touch the HTML.
- **Change a price** in the `pricing` section → updates the pricing page instantly.
- **Add/remove a testimonial, a stat, a "why choose us" feature, a service-area sector** → same idea, just edit the array in `config.js`.

Open `js/config.js` in any text editor (VS Code, Notepad++, even Notepad). It's organized into clearly commented sections. Each section is a small JavaScript object or array — as long as you keep the `{ }`, `[ ]`, quotes `"..."` and commas `,` in the same shape, you can safely change any of the text values.

**Example** — changing your phone number:
```js
contact: {
  phoneDisplay: "+91 90000 00000",   // <- change the text shown to users
  phoneLink: "+919000000000",        // <- change the digits used for tel: links
  whatsappNumber: "919000000000",    // <- change the digits used for WhatsApp links (no + or spaces)
  ...
```

## PLACEHOLDER values you should replace

Search `config.js` for the word `PLACEHOLDER` (Ctrl+F) — every one of these needs your real info:

| What | Where in config.js |
|---|---|
| Phone number | `contact.phoneDisplay`, `contact.phoneLink` |
| WhatsApp number | `contact.whatsappNumber` |
| Email | `contact.email` |
| Address | `contact.addressLine1`, `contact.addressLine2` |
| Google Maps embed | `contact.mapEmbedUrl` (see below) |
| Social links | `social.instagram`, `social.facebook` |
| Service areas (Noida sectors) | `serviceAreas` array |
| Prices | `pricing.categories` |
| Testimonials | `testimonials` array — these are currently sample quotes, replace with real reviews when you have them |

### Getting your Google Maps embed link
1. Go to Google Maps, search your business/address (or drop a pin).
2. Click **Share** → **Embed a map** → copy the URL inside `src="..."` in the code they give you.
3. Paste that URL as the value of `contact.mapEmbedUrl` in `config.js`.

## Images

All photos currently come from Unsplash (free stock photos), linked directly by URL in the `images` section of `config.js` — nothing is downloaded, so there's nothing to manage, but it also means these pages need an internet connection to show images.

To swap in your own real photos later:
1. Add your image file into the `images/` folder.
2. In `config.js`, change the relevant URL (e.g. `heroHome: "https://images.unsplash.com/..."`) to a relative path (e.g. `heroHome: "images/my-photo.jpg"`).

Your actual CleanArk logo (from the file you uploaded) is already in use as the site logo and favicon — see `images/logo.png` and `images/favicon-*.png`. If you ever get a higher-resolution or transparent-background version of the logo, just replace `images/logo.png` with the new file (keep the same filename) and it updates everywhere.

## The booking form (contact.html)

This is a **static site with no server**, so the "Submit Request" button currently only validates the form in the browser and shows a success message — it does not actually send the request anywhere yet. There's also a **"Send via WhatsApp Instead"** button that works immediately with zero setup: it opens WhatsApp with a pre-filled message built from whatever the visitor typed into the form.

To make "Submit Request" actually deliver bookings somewhere, pick one:

- **Formspree / Getform / Basin (easiest, no code)** — sign up free at one of these, they give you a form endpoint URL. In `contact.html`, add `action="https://your-endpoint-url"` and `method="POST"` to the `<form id="booking-form">` tag, then in `js/site.js` remove the line `e.preventDefault();` inside `wireForm()`. Submissions will then land in your Formspree/Getform inbox or email.
- **Your own backend** — inside `js/site.js`, find the `wireForm()` function and add a `fetch()` call that POSTs the form data to your API.
- **Just use WhatsApp** — leave it as-is; the WhatsApp button already works standalone and needs no backend.

## Changing colors / fonts / overall look

Open `css/style.css` and look at the very top — the `:root { ... }` block. These are CSS variables used everywhere on the site:

```css
:root {
  --navy: #0c1b45;     /* main dark brand color */
  --blue: #1b3fae;     /* main accent/brand color */
  --gold: #e8b923;      /* used for star ratings */
  ...
```

Change a value here and it updates across every page and every component (buttons, headers, footer, etc.) — no need to hunt through the CSS for individual colors.

## Adding a new page

1. Copy `about.html` (it's the simplest page) and rename it, e.g. `faq.html`.
2. Replace the `<section>` content in the middle with your new content — keep the header and footer blocks as-is (copy/paste them exactly from another page).
3. Add a new entry to the `nav` array in `config.js`:
   ```js
   { label: "FAQ", href: "faq.html" }
   ```
   It will automatically appear in the navigation on every page.

## Deploying the site

Any static web host works — no build step needed. A few free/simple options: Netlify (drag-and-drop the folder), GitHub Pages, Vercel, or your own hosting via FTP. Just upload the whole `cleanark` folder as-is.
