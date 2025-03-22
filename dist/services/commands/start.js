"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStartCommand = setupStartCommand;
const telegraf_1 = require("telegraf");
const user_service_1 = require("../user.service");
const user_model_1 = __importDefault(require("../../models/user.model"));
function setupStartCommand(bot, userStates) {
    bot.command("start", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
        const userName = (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username;
        const firstName = (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name;
        const user = yield user_service_1.UserService.getUser(userId);
        console.log("Received /start command from:", userName);
        yield ctx.reply("👋 <b>Yo, I'm your personal expense tracker bot!</b> \n\n" +
            "Just <b>drop your expenses</b> or <b>forward transaction SMS</b> my way 💸📩\n\n" +
            "I'll handle the rest! 🚀", { parse_mode: "HTML" });
        if (!user) {
            yield ctx.reply("👀 Hey, looks like you're new here!\n\n" +
                "Drop your bank & credit card names like this:\n" +
                "👉 HDFC Bank, SBI Credit Card\n\n" +
                "Let's get this 💸 tracking started! 🚀", Object.assign({ parse_mode: "Markdown" }, telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("➕💳 Add Bank & Card Names", "ADD_BANKS"),
            ])));
            // const categories = await UserService.getCategories(userId!);
            const categories = ["Food", "Groceries", "Rent", "Bills", "Transport", "Shopping", "Entertainment", "Health", "Travel", "Other"];
            const newUserData = new user_model_1.default({
                userId: userId,
                name: firstName || "Unknown User",
                accounts: [],
                categories: categories,
            });
            yield user_service_1.UserService.createUser(userId, newUserData);
        }
    }));
    // Handle the button click
    bot.action("ADD_BANKS", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
        yield ctx.answerCbQuery(); // Acknowledge button press
        yield ctx.reply("🔹 Please send your bank & credit card names like this:\n👉 HDFC Bank, SBI Credit Card");
        userStates.set(userId, "waiting_for_banks"); // Set user state
    }));
}
