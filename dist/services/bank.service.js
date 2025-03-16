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
exports.handleBankDetails = handleBankDetails;
exports.formatBankDetails = formatBankDetails;
const telegraf_1 = require("telegraf");
const ai_utils_1 = require("../utils/ai.utils");
const user_service_1 = require("./user.service");
/**
 * Handles bank detail validation and updates user data.
 */
function handleBankDetails(ctx, userId, userInput, userStates) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, ai_utils_1.validateBankDetails)(userInput);
        if (response.isValid) {
            userStates.delete(userId);
            yield user_service_1.UserService.updateBankDetails(userId, response.bankNames);
            const formattedMessage = formatBankDetails(response.bankNames);
            yield ctx.reply(formattedMessage, Object.assign({ parse_mode: "HTML" }, telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("✏️ Edit", "EDIT_BANKS"),
                telegraf_1.Markup.button.callback("🚀 Start Tracking Expenses", "START_TRACKING"),
            ])));
        }
        else {
            yield ctx.reply("❌ Invalid bank details: " + response.message);
        }
    });
}
/**
 * Formats bank and credit card names separately.
 */
function formatBankDetails(bankNames) {
    const banks = bankNames
        .filter((name) => !name.toLowerCase().includes("credit card"))
        .map((name) => `🏦 ${name}`)
        .join("\n");
    const creditCards = bankNames
        .filter((name) => name.toLowerCase().includes("credit card"))
        .map((name) => `💳 ${name}`)
        .join("\n");
    return (`<b>✅ Successfully Added:</b>\n\n` +
        (banks ? `<b>Banks:</b>\n${banks}\n\n` : "") +
        (creditCards ? `<b>Credit Cards:</b>\n${creditCards}\n\n` : "") +
        "What would you like to do next? 👇");
}
