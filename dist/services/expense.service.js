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
exports.handleExpenseMessage = handleExpenseMessage;
exports.handleAccountSelection = handleAccountSelection;
exports.handleCategorySelection = handleCategorySelection;
const telegraf_1 = require("telegraf");
const user_service_1 = require("./user.service");
const ai_utils_1 = require("../utils/ai.utils");
const pendingExpenses = new Map(); // Stores temp data while waiting for input
function handleExpenseMessage(ctx, userId, userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedData = yield (0, ai_utils_1.parseExpense)(userInput);
        console.log("parsedData--", parsedData);
        let { amount, account, category, description } = parsedData;
        if (!amount) {
            return ctx.reply("🧐 Please provide a valid expense.\n\n *Example:* `Spent 100 on groceries from HDFC Bank.`", { parse_mode: "Markdown" });
        }
        // Fetch user accounts from DB
        const user = yield user_service_1.UserService.getUser(userId);
        if (!user)
            return ctx.reply("⚠️ User not found in DB!!! \n Please tap on /start to start the bot");
        // Store temporary expense data
        pendingExpenses.set(userId, { amount, account, category });
        // If account is missing, ask user to select one
        if (!account) {
            return ctx.reply("🧐 From which account should I add this expense?", telegraf_1.Markup.inlineKeyboard(user.accounts.map((acc) => telegraf_1.Markup.button.callback(acc, `SELECT_ACCOUNT_${acc}`)), { columns: 2 }));
        }
        // If category is missing, ask user to select one
        if (!category) {
            return ctx.reply("🧐 What type of expense is this??", telegraf_1.Markup.inlineKeyboard(user.categories.map((cat) => telegraf_1.Markup.button.callback(cat, `SELECT_CATEGORY_${cat}`)), { columns: 3 }));
        }
        // Save the expense
        const expense = yield user_service_1.UserService.addExpense(userId, {
            amount: amount || 0,
            account,
            category,
            description: description || undefined
        });
        if (!expense)
            return ctx.reply("⚠️ Failed to add expense!");
        ctx.reply(`✅ Added ₹${amount} under "${category}" from ${account}!`);
    });
}
// Handles account selection
function handleAccountSelection(ctx, userId, account) {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = pendingExpenses.get(userId);
        if (!expense)
            return ctx.reply("⚠️ No pending expense found!");
        expense.account = account;
        // If category is still missing, ask for it
        if (!expense.category) {
            const user = yield user_service_1.UserService.getUser(userId);
            if (!user)
                return ctx.reply("⚠️ User not found in DB!!! \n Please tap on /start to start the bot");
            return ctx.reply("🧐 What type of expense is this?", Object.assign({}, telegraf_1.Markup.inlineKeyboard(user.categories.map((cat) => telegraf_1.Markup.button.callback(cat, `SELECT_CATEGORY_${cat}`)))));
        }
        // Save if category is present
        yield saveExpense(ctx, userId, expense.amount, expense.account, expense.category, expense.description);
    });
}
// Handles category selection
function handleCategorySelection(ctx, userId, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = pendingExpenses.get(userId);
        if (!expense)
            return ctx.reply("⚠️ No pending expense found!\n Please add expense again");
        expense.category = category;
        // If account is still missing, ask for it
        if (!expense.account) {
            const user = yield user_service_1.UserService.getUser(userId);
            if (!user)
                return ctx.reply("⚠️ User not found in DB!!! \n Please tap on /start to start the bot");
            return ctx.reply("🧐 From which account should I add this expense?", Object.assign({}, telegraf_1.Markup.inlineKeyboard(user.accounts.map((acc) => telegraf_1.Markup.button.callback(acc, `SELECT_ACCOUNT_${acc}`)))));
        }
        // Save if account is present
        yield saveExpense(ctx, userId, expense.amount, expense.account, expense.category);
    });
}
// Saves the expense to the DB
function saveExpense(ctx, userId, amount, account, category, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const expense = yield user_service_1.UserService.addExpense(userId, {
            amount,
            account,
            category,
            description
        });
        console.log("expense====", expense);
        if (!expense)
            return ctx.reply("⚠️ Failed to add expense!");
        pendingExpenses.delete(userId);
        ctx.reply(`✅ Added ₹${amount} under "${category}" from ${account}!`);
    });
}
