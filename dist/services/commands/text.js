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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupText = setupText;
const bank_service_1 = require("../bank.service");
const expense_service_1 = require("../expense.service");
function setupText(bot, userStates) {
    bot.on("text", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
        const userInput = ctx.message.text.trim();
        if (userStates.get(userId) === "waiting_for_banks") {
            yield (0, bank_service_1.handleBankDetails)(ctx, userId, userInput, userStates);
            return;
        }
        console.log("Regular text message:", userInput);
        yield (0, expense_service_1.handleExpenseMessage)(ctx, userId, userInput);
    }));
    bot.action("EDIT_BANKS", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield ctx.answerCbQuery();
        yield ctx.reply("✏️ Send me your updated bank & credit card names!");
        userStates.set((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString(), "waiting_for_banks");
    }));
    bot.action("START_TRACKING", (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if ((_b = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.message_id) {
                yield ctx.deleteMessage(ctx.callbackQuery.message.message_id);
            }
            yield ctx.reply("🚀 Awesome! Start forwarding your expense messages, and I'll track them for you! 💸");
        }
        catch (error) {
            console.error("Error deleting message:", error);
        }
    }));
    // Handle account selection
    bot.action(/^SELECT_ACCOUNT_(.+)$/, (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
        const account = ctx.match[1];
        yield ctx.answerCbQuery();
        yield (0, expense_service_1.handleAccountSelection)(ctx, userId, account);
    }));
    // Handle category selection
    bot.action(/^SELECT_CATEGORY_(.+)$/, (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString();
        const category = ctx.match[1];
        yield ctx.answerCbQuery();
        yield (0, expense_service_1.handleCategorySelection)(ctx, userId, category);
    }));
}
