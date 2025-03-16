import { Context, Telegraf } from "telegraf";

export function setupTodayCommand(bot: Telegraf) {
    bot.command("today", async (ctx: Context) => {
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
    });
}
