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
exports.setupTodayCommand = setupTodayCommand;
function setupTodayCommand(bot) {
    bot.command("today", (ctx) => __awaiter(this, void 0, void 0, function* () {
        ctx.reply("Today's expenses hit");
        //   const userId = ctx.from.id.toString();
        //   const today = new Date();
        //   today.setHours(0, 0, 0, 0);
        //   const expenses = await Expense.find({ userId, date: { $gte: today } });
        //   if (expenses.length === 0) {
        //     ctx.reply("No expenses recorded today.");
        //     return;
        //   }
        //   const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        //   let message = `Today's Expenses:\n\n`;
        //   expenses.forEach((exp) => {
        //     message += `₹${exp.amount} - ${exp.description} (${exp.category})\n`;
        //   });
        //   message += `\nTotal: ₹${total}`;
        //   ctx.reply(message);
    }));
}
