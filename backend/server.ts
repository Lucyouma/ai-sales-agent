import express from "express";
import cors from "cors";
import { runSalesAgentPipeline } from "./index";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Endpoint to trigger pipeline
app.post("/run-agent", async (req, res) => {
  try {
    console.log("🚀 Starting sales agent pipeline...");
    const results = await runSalesAgentPipeline();
    res.json({ 
      success: true, 
      message: "Pipeline completed successfully",
      results 
    });
  } catch (error) {
    console.error("❌ Pipeline error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Pipeline failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});