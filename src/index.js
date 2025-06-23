


// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const axios = require("axios");


// const app = express();
// app.use(cors());
// app.use(express.json());
// const upload = multer();
// const GEMINI_API_KEY = "AIzaSyD82wIFNePMkPkBa8wT27G-l3XW7JRS3rQ"; // 👈 yahan apna key paste karo


// app.post("/api/recommend", upload.none(), async (req, res) => {
//   const { description } = req.body;

//   if (!description) {
//     return res.status(400).json({ error: "Description is required" });
//   }

//   const prompt = `
// You are a fashion stylist AI. A user is wearing the following outfit: "${description}". 
// Recommend 3 stylish shoe options. For each shoe, give:
// - Name
// - One-sentence reason why it matches
// - Style (like sneaker, loafer, etc.)

// Respond only in JSON format like:
// [
//   {
//     "name": "White Leather Sneakers",
//     "reason": "Matches the minimal aesthetic of the outfit",
//     "style": "Sneakers"
//   }
// ]
// `;

//   try {
//    const response = await axios.post(
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//   {
//     contents: [
//       {
//         role: "user",
//         parts: [{ text: prompt }]
//       }
//     ]
//   },
//   {
//     headers: { "Content-Type": "application/json" }
//   }
// );


//     const modelText = response.data.candidates[0].content.parts[0].text;
//     const jsonStart = modelText.indexOf("[");
//     const jsonEnd = modelText.lastIndexOf("]");
//     const suggestions = JSON.parse(modelText.slice(jsonStart, jsonEnd + 1));

//     res.json(suggestions);
//   } catch (err) {
//     console.error("Gemini API Error:", err.message);
//     res.status(500).json({ error: "Gemini API Failed" });
//   }
// });
    

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs";
// const app = express();
// dotenv.config();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());

// const upload = multer({ storage: multer.memoryStorage() });
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post("/api/recommend", upload.single("image"), async (req, res) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const { description } = req.body;

//     const prompt = `Suggest 3 stylish shoe options with names and reasons for the following outfit: ${description}`;
//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     const recommendations = text
//       .split("\n")
//       .filter((line) => line.includes("-"))
//       .map((line) => {
//         const [name, reason] = line.split(" - ");
//         return { name: name.trim(), reason: reason.trim() };
//       });

//     res.json({ recommendations });
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     res.status(500).json({ error: "AI failed" });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server is running at http://localhost:5000");
// });


// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const axios = require("axios");

// const app = express();
// const upload = multer();

// app.use(cors());
// app.use(express.json());

// const GEMINI_API_KEY = "AIzaSyD82wIFNePMkPkBa8wT27G-l3XW7JRS3rQ"; // Replace with your API key

// app.post("/api/recommend", upload.none(), async (req, res) => {
//   const { description } = req.body;

//   if (!description) {
//     return res.status(400).json({ error: "Description is required" });
//   }

// app.use(cors({
//   origin: "https://shoes-gveu.vercel.app" // Or use "*" for all origins (not recommended for production)
// }));


//   const prompt = `
// You are a fashion stylist AI. A user is wearing the following outfit: "${description}". 
// Recommend 3 stylish shoe options. For each shoe, give:
// - Name
// - One-sentence reason why it matches
// - Style (like sneaker, loafer, etc.)

// Respond only in JSON format like:
// [
//   {
//     "name": "White Leather Sneakers",
//     "reason": "Matches the minimal aesthetic of the outfit",
//     "style": "Sneakers"
//   }
// ]
// `;

//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: prompt }],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const modelText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     if (!modelText.includes("[")) {
//       return res.status(500).json({ error: "Invalid response from Gemini" });
//     }

//     const jsonStart = modelText.indexOf("[");
//     const jsonEnd = modelText.lastIndexOf("]");
//     const jsonString = modelText.slice(jsonStart, jsonEnd + 1);

//     const suggestions = JSON.parse(jsonString);
//     res.json(suggestions);
//   } catch (err) {
//     console.error("Gemini API Error:", err.message || err);
//     res.status(500).json({ error: "Gemini API Failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer();

// ✅ CORS middleware: allow only your frontend origin
app.use(cors({
  origin: "https://shoes-gveu.vercel.app" // Replace with "*" only if testing locally
}));

app.use(express.json());

const GEMINI_API_KEY = "AIzaSyD82wIFNePMkPkBa8wT27G-l3XW7JRS3rQ"; // Replace with your API key

// ✅ Route for AI recommendation
app.post("/api/recommend", upload.none(), async (req, res) => {
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

    if (!modelText.includes("[")) {
      return res.status(500).json({ error: "Invalid response from Gemini" });
    }

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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
