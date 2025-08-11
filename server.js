import dotenv from "dotenv"
import cors from "cors"
import fetch from  "node-fetch"
import express from "express";


dotenv.config()

const app = express()
app.use(cors())
app.get("/search", async (req, res) => {
    try{
        const { q, engine } = req.query;
        if (!q || !engine){
            return res.status(400).json({error: "Missing q or engine"})
        }
        
        const queryParam = engine === "yahoo" ? `p=${encodeURIComponent(q)}` : `q=${encodeURIComponent(q)}`;
        const url = `https://serpapi.com/search.json?engine=${engine}&${queryParam}&api_key=${process.env.SERPAPI_KEY}`;
        const r = await fetch(url);

        if (!r.ok) {
            return res.status(r.status).json({ error: `SerpAPI HTTP ${r.status}`});
        }

        const data = await r.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: String(e) });
    }
});

// app.get("/search-yahoo-test", async (req, res) => {
//     const testQuery = "batman";
//     const url = `https://serpapi.com/search.json?engine=yahoo&p=${encodeURIComponent(testQuery)}&api_key=${process.env.SERPAPI_KEY}`;
//     console.log("Testing Yahoo URL:", url);

//     try {
//         const r = await fetch(url);
//         const data = await r.json();
//         res.json(data);
//     } catch (e) {
//         res.status(500).json({ error: String(e) });
//     }
// });


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
});