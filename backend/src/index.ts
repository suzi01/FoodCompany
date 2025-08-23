import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Example API route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Express + TS!" });
});

// In production: serve Vite build output
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
