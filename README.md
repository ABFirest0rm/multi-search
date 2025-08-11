# Multi Search

Multi Search is a web app that lets you search **Google**, **Bing**, **Yahoo**, and **DuckDuckGo** side-by-side in a single page.  
It uses the [SerpAPI](https://serpapi.com/) service to fetch real search results from each engine.

---

## ✨ Features

- **Multiple engines at once** — see results from Google, Bing, Yahoo, and DuckDuckGo together.
- **Clean responsive layout** — results appear in a 4-column grid that adjusts for smaller screens.
- **Dark mode toggle** — switch between light and dark themes.
- **Scroll each engine independently** — no more scrolling one giant page.
- **Secure API key handling** — the SerpAPI key is stored server-side and never exposed to users.

---

## ⚙️ How It Works

1. The frontend (`index.html`, `style.css`, `script.js`) provides the search input and displays the results.
2. When you click **Go**, it sends a request to your backend (`server.js`) at `/search` with:
   - `q` → search query
   - `engine` → one of: `google`, `bing`, `yahoo`, `duckduckgo`
3. The backend:
   - Reads your `SERPAPI_KEY` from `.env` (locally) or Render’s Environment Variables (in production).
   - Builds the proper SerpAPI request (uses `p=` instead of `q=` for Yahoo).
   - Fetches results from SerpAPI.
   - Returns them as JSON to the frontend.
4. The frontend parses the JSON and updates the grid for that engine’s results.

---

## 🖥️ Run Locally

1. **Install dependencies**
   ```bash
   npm install

2. **Create .env in the project root:**

```SERPAPI_KEY=your_actual_serpapi_key_here

3. **Start the backend**

```node server.js

4. **Open in browser**:

```http://localhost:3000