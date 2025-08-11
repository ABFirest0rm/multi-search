import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Needed to get __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files (HTML, CSS, JS) from current folder
app.use(express.static(__dirname));

// Optional: allow cross-origin if you still plan to call API from another domain
app.use(cors());

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Search API endpoint
app.get("/search", async (req, res) => {
  try {
    const { q, engine } = req.query;
    if (!q || !engine) {
      return res.status(400).json({ error: "Missing q or engine" });
    }

    const queryParam =
      engine === "yahoo"
        ? `p=${encodeURIComponent(q)}`
        : `q=${encodeURIComponent(q)}`;

    const url = `https://serpapi.com/search.json?engine=${engine}&${queryParam}&api_key=${process.env.SERPAPI_KEY}`;
    const r = await fetch(url);

    if (!r.ok) {
      return res.status(r.status).json({ error: `SerpAPI HTTP ${r.status}` });
    }

    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Use platform-assigned port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});