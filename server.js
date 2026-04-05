require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://dreamtraveller1314.github.io"
}));
app.use(express.json());
app.use(express.static(".")); 

app.post("/explain", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Error" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a wise interpreter of the Book of Answers. When given a question and a cryptic answer, explain what the answer might mean in the context of that question. Keep it thoughtful, warm, and under 3 sentences."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      })
    });

    const data = await groqRes.json();
    const explanation = data.choices[0].message.content;
    res.json({ explanation });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Running`);
});