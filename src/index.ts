import express from "express";
import mongoose from "mongoose";
import { BotService } from "./services/bot.service";
import { env } from "./config/env";

const app = express();
const port = env.PORT || 3000;

// Start the bot regardless of DB connection
const bot = new BotService();
bot.start();

// Connect to MongoDB
mongoose
  .connect(env.MONGODB_URI!)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });

// ✅ Register webhook route
app.use(bot.webhookCallback("/webhook"));

// ✅ Set webhook in Telegram API
bot.telegram.setWebhook("https://ai-expense-tracket.onrender.com/webhook");

bot.telegram.setMyCommands([
  { command: "summary", description: "📊 View last 10 transactions" },
  { command: "add", description: "➕ Add a new expense" },
  { command: "history", description: "📜 View full transaction history" },
  { command: "settings", description: "⚙️ Change preferences" },
]);


// Start the Express server
app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port}`);
});

// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
