import { Telegraf } from "telegraf";
import { checkDatabaseMiddleware } from "./middleware/db.middleware";
import { registerCommands } from "./commands";
import { env } from "../config/env";

export class BotService {
  private bot: Telegraf;
  private userStates: Map<string, string>; // Store user states

  constructor() {
    if (!env.BOT_TOKEN) {
      throw new Error("BOT_TOKEN must be provided!");
    }

    this.bot = new Telegraf(env.BOT_TOKEN);
    this.userStates = new Map(); // Initialize the user states map

    // Apply middleware
    this.bot.use(checkDatabaseMiddleware);

    // Register all commands with userStates
    registerCommands(this.bot, this.userStates);
  }

  public start() {
    this.bot.launch();
    console.log("🤖 Bot is running..");

    // Enable graceful stop
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }

  public webhookCallback(path: string) {
    return this.bot.webhookCallback(path);
  }

  public get telegram() {
    return this.bot.telegram;
  }
}
