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
bot.telegram.setWebhook("https://4fc5-59-152-121-201.ngrok-free.app/webhook");

// Start the Express server
app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port}`);
});

// Basic health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
