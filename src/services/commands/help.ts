import { Context, Telegraf } from "telegraf";

export function setupHelpCommand(bot: Telegraf) {
  bot.command("help", (ctx: Context) => {
    ctx.reply(
      "Usage Guide:\n" +
        '- "spent 50 rs at Starbucks from ICICI"\n' +
        '- "/summary" for expenses summary\n' +
        '- "/today" for today\'s expenses'
    );
  });
}
