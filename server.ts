import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  // API Route for Image Generation
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, title, description } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      // Enhanced prompt for the "Artisan" style
      const finalPrompt = `Professional high-fidelity art for a portfolio project. 
        Style: Traditional painting, motion-blurred, artisanal, textured, premium aesthetic.
        Subject: ${title}. ${description}.
        Mood: Sophisticated, moody, elegant.
        Additional details: ${prompt || ""}`;

      const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });
      
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      
      console.log("Gemini Response received");

      // Extract image from parts
      const candidate = response.candidates?.[0];
      const part = candidate?.content?.parts?.find(p => p.inlineData);

      if (part?.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return res.json({ imageUrl: `data:${mimeType};base64,${imageData}` });
      }

      console.error("No inlineData found in response:", JSON.stringify(response, null, 2));
      res.status(500).json({ error: "No image data found in AI response" });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
