# Kaviya M — Portfolio

React + Vite portfolio (frontend) with a small Express server (`/server`) that delivers contact-form messages to your email and WhatsApp.

## Run the website

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

Requires Node 18+.

## Edit your content — `src/data.js`

- `profile.github` — your GitHub URL
- `projects` — for each project set:
  - `github` — repository link
  - `demo` — the live site's **first page** link. The card image is then an automatic preview screenshot of that page (first load can take a few seconds).
  - `screenshot` *(optional)* — e.g. `"/projects/my-shot.png"` (file in `public/projects/`) to use your own image instead
  - Until a `demo` link is set, the card shows a neutral placeholder frame.
- The PharmEasy Clone card has a teal `theme`; edit or remove it.
- Tech lists for the Vehicle Service and Athlete Performance projects are placeholders — confirm them.
- AI Tools box: the last item is **v0** (Vercel's tool). If you meant something else, edit it.

## Contact form → Email + WhatsApp

A website can't send email or WhatsApp by itself, so the form posts to the server in `/server`. When someone submits, the server **emails you** (Gmail) and **sends you a WhatsApp message** (CallMeBot).

### 1. Configure the server

```bash
cd server
cp .env.example .env     # then fill in .env
npm install
npm start                # http://localhost:5000
```

**Email (Gmail):** turn on 2-Step Verification, create an *App password* at https://myaccount.google.com/apppasswords, and put it in `EMAIL_APP_PASSWORD`.

**WhatsApp (CallMeBot, free):** follow the one-time activation steps at https://www.callmebot.com/blog/free-api-whatsapp-messages/ — it gives you an API key. Put your number (country code, digits only, e.g. `91XXXXXXXXXX`) in `WHATSAPP_NUMBER` and the key in `CALLMEBOT_API_KEY`.
CallMeBot is a free third-party service and not guaranteed to be reliable. For a more dependable option, swap the WhatsApp block in `server/index.js` for Twilio or the WhatsApp Business API.

You can use only one channel: leave the other's values empty.

### 2. Point the website at the server

```bash
cp .env.example .env     # in the project root
# VITE_API_URL=http://localhost:5000
```

Restart `npm run dev`. If `VITE_API_URL` is not set, the form falls back to opening the visitor's mail app.

### 3. Deploy (so it works on your live site)

- Deploy the **website** (Vercel, Netlify…) with env var `VITE_API_URL` = your server's URL.
- Deploy the **`server` folder** (Render, Railway…) with the `.env` values as environment variables, and set `ALLOWED_ORIGIN` to your website's URL.
- Never commit `server/.env`.

The server rejects invalid input, blocks simple bot spam (hidden field) and limits each visitor to 5 messages per hour.

## Other customisation

- **Colours and fonts** — CSS variables at the top of `src/styles.css` (Sora headings, DM Sans body; loaded in `index.html`)
- **Resume** — `public/Kaviya_M_Resume.pdf` (linked from the nav)

## Structure

```
src/
  data.js            all content
  components/        Navbar, Hero, About, Skills, Projects, Experience, Education, Contact, Footer
  hooks/             useReveal, useActiveSection
  styles.css
server/              contact server (email + WhatsApp)
```
