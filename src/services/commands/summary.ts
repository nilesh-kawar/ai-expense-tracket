import { Context, Telegraf } from "telegraf";

export function setupSummaryCommand(bot: Telegraf) {
    bot.command("summary", async (ctx: Context) => {
        ctx.reply("summary's expenses hit");
        // const userId = ctx.from.id.toString();
        // const expenses = await Expense.find({ userId });
        // const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // ctx.reply(
        //     `💰 Total Expenses: ₹${total}\n📊 Number of transactions: ${expenses.length}`
        // );
    });
}
