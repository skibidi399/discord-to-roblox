// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const SHARED_SECRET = process.env.SHARED_SECRET || "BIG_SECRET_TOKEN";
let messages = []; // { id, ts, author, content }

app.post('/publish', (req, res) => {
  const auth = (req.headers['authorization'] || "");
  if (auth !== `Bearer ${SHARED_SECRET}`) return res.status(401).json({ error: "unauthorized" });

  const { author, content } = req.body;
  if (!author || !content) return res.status(400).json({ error: "missing fields" });

  const item = { id: Date.now().toString(), ts: Date.now(), author, content };
  messages.push(item);
  if (messages.length > 5000) messages.splice(0, messages.length - 5000);
  res.json({ ok: true, item });
});

app.get('/messages', (req, res) => {
  const qsecret = req.query.secret || "";
  const auth = req.headers['authorization'] || "";
  if (qsecret !== SHARED_SECRET && auth !== `Bearer ${SHARED_SECRET}`) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const since = parseInt(req.query.since) || 0;
  const out = messages.filter(m => m.ts > since);
  res.json({ ok: true, messages: out });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
