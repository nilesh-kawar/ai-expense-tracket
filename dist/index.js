"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bot_service_1 = require("./services/bot.service");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
const port = env_1.env.PORT || 3000;
// Start the bot regardless of DB connection
const bot = new bot_service_1.BotService();
bot.start();
// Connect to MongoDB
mongoose_1.default
    .connect(env_1.env.MONGODB_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB!!!");
})
    .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
});
if (process.env.NODE_ENV === "production") {
    // ✅ Use webhook in production
    const WEBHOOK_URL = env_1.env.WEBHOOK_URL || "https://ai-expense-tracket.onrender.com/webhook";
    bot.telegram.setWebhook(WEBHOOK_URL);
    app.use(bot.webhookCallback("/webhook"));
    console.log("🚀 Running in production mode with webhook");
}
// Start the Express server
app.listen(port, () => {
    console.log(`🌐 Server is running on port ${port}`);
});
// Basic health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});
exports.default = app;
