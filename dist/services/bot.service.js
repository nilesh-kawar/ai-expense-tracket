"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const telegraf_1 = require("telegraf");
const db_middleware_1 = require("./middleware/db.middleware");
const commands_1 = require("./commands");
const env_1 = require("../config/env");
class BotService {
    constructor() {
        if (!env_1.env.BOT_TOKEN) {
            throw new Error("BOT_TOKEN must be provided!");
        }
        this.bot = new telegraf_1.Telegraf(env_1.env.BOT_TOKEN);
        this.userStates = new Map(); // Initialize the user states map
        // Apply middleware
        this.bot.use(db_middleware_1.checkDatabaseMiddleware);
        // Register all commands with userStates
        (0, commands_1.registerCommands)(this.bot, this.userStates);
    }
    start() {
        this.bot.launch();
        console.log("🤖 Bot is running..");
        // Enable graceful stop
        process.once("SIGINT", () => this.bot.stop("SIGINT"));
        process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
    }
}
exports.BotService = BotService;
