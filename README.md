# donate site

A small static donation page that shows your Roblox game passes. The re/up
**donate** button opens this site in the browser.

## Add / edit your game passes (only you can)

Edit **`gamepasses.json`**, nothing else. Each entry:

```json
{ "id": 123456789, "name": "small tip", "price": 25, "image": "" }
```

- `id` : your game pass id (the number in `roblox.com/game-pass/<id>/...`).
- `name` : what the card shows.
- `price` : Robux amount shown on the card (display only).
- `image` : optional. Paste a direct image URL (e.g. the game pass icon's
  rbxcdn link) for a thumbnail; leave `""` for a 🎁 placeholder.

You can also change `title`, `subtitle`, `badge`, and `footer` at the top.

## Host it

It's fully static (no build step). Upload this folder to any static host:

- **GitHub Pages**: push the folder to a repo, enable Pages.
- **Netlify / Cloudflare Pages / Vercel**: drag-and-drop the folder.

You'll get a URL like `https://yourname.github.io/donate/`.

## Point the app at it

In the app's `public/donate.json`, set:

```json
{ "url": "https://yourname.github.io/donate/" }
```

Then rebuild re/up (`node build.js`). The **donate** button now opens your site.
