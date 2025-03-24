import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { BotService } from "./services/bot.service";
import { env } from "./config/env";

const app = express();
const port = env.PORT || 3000;

// Middleware
app.use(express.json());

// Start the bot
const bot = new BotService();
bot.start();

// MongoDB Connection
mongoose
  .connect(env.MONGODB_URI!)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

if (process.env.NODE_ENV === "production") {
  // ✅ Hardcoded webhook URL
  const WEBHOOK_URL = "https://ai-expense-tracket.vercel.app/webhook";

  bot.telegram
    .setWebhook(WEBHOOK_URL)
    .then(() => console.log("✅ Webhook set successfully!"))
    .catch((err) => console.error("❌ Failed to set webhook:", err));

  app.use(bot.webhookCallback("/webhook"));
  console.log("🚀 Running in production mode with webhook");
}

// Home Page Route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to AI Expense Tracker Bot 🚀</h1><p>Bot is running smoothly!</p>"
  );
});

// Health Check Endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

// Start the Express server
app.listen(port, () => console.log(`🌐 Server is running on port ${port}`));

export default app;
