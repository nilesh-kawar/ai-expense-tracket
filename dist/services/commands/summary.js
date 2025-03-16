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
exports.setupSummaryCommand = setupSummaryCommand;
function setupSummaryCommand(bot) {
    bot.command("summary", (ctx) => __awaiter(this, void 0, void 0, function* () {
        ctx.reply("summary's expenses hit");
        // const userId = ctx.from.id.toString();
        // const expenses = await Expense.find({ userId });
        // const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        // ctx.reply(
        //     `💰 Total Expenses: ₹${total}\n📊 Number of transactions: ${expenses.length}`
        // );
    }));
}
