import { Telegraf } from "telegraf";

export function setupAddBanksCommand(
  bot: Telegraf,
  userStates: Map<string, string>
) {
  bot.command("addbanks", async (ctx) => {
    const userId = ctx.from?.id.toString();
    userStates.set(userId, "waiting_for_banks"); // Set user state

    await ctx.reply(
      "📢 Send me your bank names like this:\n👉 `HDFC, SBI Credit Card`"
    );
  });
}
