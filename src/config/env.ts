import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  BOT_TOKEN: process.env.BOT_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  MODEL_ENDPOINT: process.env.MODEL_ENDPOINT,
  MODEL_NAME: process.env.MODEL_NAME,
  TEMPERATURE: process.env.TEMPERATURE,
  MAX_TOKENS: process.env.MAX_TOKENS,
  TOP_P: process.env.TOP_P,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
};