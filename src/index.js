const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://shoes-gveu.vercel.app"],
  credentials: true
}));
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyD82wIFNePMkPkBa8wT27G-l3XW7JRS3rQ"; // Replace if needed

// ✅ AI Recommendation from Text Only
app.post("/api/recommend", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const prompt = `
You are a fashion stylist AI. A user is wearing the following outfit: "${description}". 
Recommend 3 stylish shoe options. For each shoe, give:
- Name
- One-sentence reason why it matches
- Style (like sneaker, loafer, etc.)

Respond only in JSON format like:
[
  {
    "name": "White Leather Sneakers",
    "reason": "Matches the minimal aesthetic of the outfit",
    "style": "Sneakers"
  }
]

    

`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const modelText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonStart = modelText.indexOf("[");
    const jsonEnd = modelText.lastIndexOf("]");
    const jsonString = modelText.slice(jsonStart, jsonEnd + 1);

    const suggestions = JSON.parse(jsonString);
    res.json(suggestions);
  } catch (err) {
    console.error("Gemini API Error:", err.message || err);
    res.status(500).json({ error: "Gemini API Failed" });
  }
});

  app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
