// Contact server: receives the portfolio form and
//   1) emails you (Gmail SMTP via Nodemailer)
//   2) sends you a WhatsApp message (CallMeBot)
// Secrets live in server/.env — never commit it.
import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const {
  PORT = 5000,
  ALLOWED_ORIGIN = "http://localhost:5173",
  EMAIL_USER,
  EMAIL_APP_PASSWORD,
  EMAIL_TO,
  WHATSAPP_NUMBER,
  CALLMEBOT_API_KEY,
} = process.env;

const emailEnabled = Boolean(EMAIL_USER && EMAIL_APP_PASSWORD);
const whatsappEnabled = Boolean(WHATSAPP_NUMBER && CALLMEBOT_API_KEY);

const transporter = emailEnabled
  ? nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_APP_PASSWORD },
    })
  : null;

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: ALLOWED_ORIGIN.split(",").map((o) => o.trim()),
    methods: ["POST", "GET"],
  })
);

// Simple in-memory rate limit: 5 messages / hour / IP.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, email: emailEnabled, whatsapp: whatsappEnabled })
);

app.post("/api/contact", async (req, res) => {
  const { name, email, message, website } = req.body || {};

  // Honeypot filled in → bot. Pretend it worked, send nothing.
  if (website) return res.json({ ok: true });

  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Try again later." });
  }

  const cleanName = oneLine(name ?? "");
  const cleanEmail = oneLine(email ?? "");
  const cleanMsg = String(message ?? "").trim();

  if (cleanName.length < 2 || cleanName.length > 80) return res.status(400).json({ ok: false, error: "Invalid name." });
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 120) return res.status(400).json({ ok: false, error: "Invalid email." });
  if (cleanMsg.length < 10 || cleanMsg.length > 1000) return res.status(400).json({ ok: false, error: "Invalid message." });

  if (!emailEnabled && !whatsappEnabled) {
    return res.status(503).json({ ok: false, error: "Server is not configured." });
  }

  const tasks = [];

  if (emailEnabled) {
    tasks.push(
      transporter.sendMail({
        from: `"Portfolio" <${EMAIL_USER}>`,
        to: EMAIL_TO || EMAIL_USER,
        replyTo: cleanEmail,
        subject: `Portfolio message from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMsg}`,
      })
    );
  }

  if (whatsappEnabled) {
    const text = `New portfolio message\nFrom: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMsg}`.slice(0, 900);
    const url =
      "https://api.callmebot.com/whatsapp.php" +
      `?phone=${encodeURIComponent(WHATSAPP_NUMBER)}` +
      `&text=${encodeURIComponent(text)}` +
      `&apikey=${encodeURIComponent(CALLMEBOT_API_KEY)}`;
    tasks.push(
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`CallMeBot HTTP ${r.status}`);
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("Delivery failed:", r.reason?.message || r.reason));

  // Success if at least one channel delivered.
  if (results.some((r) => r.status === "fulfilled")) return res.json({ ok: true });
  return res.status(502).json({ ok: false, error: "Could not deliver the message." });
});

app.listen(PORT, () => {
  console.log(`Contact server on :${PORT}  (email: ${emailEnabled ? "on" : "off"}, whatsapp: ${whatsappEnabled ? "on" : "off"})`);
});
