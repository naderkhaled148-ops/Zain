import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Audio buffer cache for repeated letters, words, and praises
const ttsCache = new Map<string, Buffer>();

// Helper to clean Arabic text for speech synthesis
function cleanTextForSpeech(raw: string): string {
  if (!raw) return "";
  return raw
    // Remove emojis
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, " ")
    // Remove brackets and noisy punctuation
    .replace(/[«»"'“”„{}()[\]#@]/g, " ")
    .replace(/\.{2,}/g, "، ")
    .replace(/\s+/g, " ")
    .trim();
}

// Split text into safe chunks under 150 characters for Google TTS
function splitTextIntoChunks(text: string, maxLength: number = 150): string[] {
  if (text.length <= maxLength) return [text];

  const chunks: string[] = [];
  const sentences = text.split(/([،؛.؟!]+|\n+)/);
  let current = "";

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    if ((current + part).length <= maxLength) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (part.length > maxLength) {
        // Split by words
        const words = part.split(/\s+/);
        let wordChunk = "";
        for (const w of words) {
          if ((wordChunk + " " + w).length <= maxLength) {
            wordChunk += (wordChunk ? " " : "") + w;
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = w;
          }
        }
        current = wordChunk;
      } else {
        current = part;
      }
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text.slice(0, maxLength)];
}

// Fetch a single TTS chunk
async function fetchTtsChunk(chunk: string): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(chunk)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "audio/mpeg, audio/*;q=0.9, */*;q=0.8"
    }
  });

  if (!res.ok) {
    throw new Error(`Google TTS responded with status ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// High-fidelity Arabic TTS endpoint
app.get("/api/tts", async (req, res) => {
  const query = (req.query.text || req.query.q || "") as string;
  const cleaned = cleanTextForSpeech(query);

  if (!cleaned) {
    res.status(400).send("Text query parameter is required.");
    return;
  }

  // Check cache
  const cached = ttsCache.get(cleaned);
  if (cached) {
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", cached.length);
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    res.end(cached);
    return;
  }

  try {
    const chunks = splitTextIntoChunks(cleaned, 140);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      if (chunk.trim()) {
        const buf = await fetchTtsChunk(chunk.trim());
        audioBuffers.push(buf);
      }
    }

    const combined = Buffer.concat(audioBuffers);

    // Keep cache size bounded
    if (ttsCache.size > 500) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cleaned, combined);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", combined.length);
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    res.end(combined);
  } catch (err: any) {
    console.error("TTS generation error:", err);
    res.status(502).json({ error: "Failed to generate Arabic speech", message: err?.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
