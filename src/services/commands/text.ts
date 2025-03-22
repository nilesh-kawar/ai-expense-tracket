import { Telegraf } from "telegraf";
import { handleBankDetails } from "../bank.service";
import { handleAccountSelection, handleCategorySelection, handleExpenseMessage } from "../expense.service";

export function setupText(bot: Telegraf, userStates: Map<string, string>) {
  bot.on("text", async (ctx) => {
    const userId = ctx.from?.id.toString();
    const userInput = ctx.message.text.trim();

    if (userStates.get(userId) === "waiting_for_banks") {
      await handleBankDetails(ctx, userId, userInput, userStates);
      return;
    }

    console.log("Regular text message:", userInput);
    await handleExpenseMessage(ctx, userId, userInput);
  });

  bot.action("EDIT_BANKS", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("✏️ Send me your updated bank & credit card names!");
    userStates.set(ctx.from?.id.toString(), "waiting_for_banks");
  });

  bot.action("START_TRACKING", async (ctx) => {
    try {
      if (ctx.callbackQuery?.message?.message_id) {
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
      }
      await ctx.reply(
        "🚀 Awesome! Start forwarding your expense messages, and I'll track them for you! 💸"
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  });

  // Handle account selection
  bot.action(/^SELECT_ACCOUNT_(.+)$/, async (ctx) => {
    const userId = ctx.from?.id.toString();
    const account = ctx.match[1];
    await ctx.answerCbQuery();
    await handleAccountSelection(ctx, userId, account);

    // Delete the message containing accounts selection buttons
    if (ctx.callbackQuery?.message) {
      ctx.deleteMessage(ctx.callbackQuery.message.message_id).catch((err) => {
        console.log("Error deleting message:", err);
      });
    }
  });

  // Handle category selection
  bot.action(/^SELECT_CATEGORY_(.+)$/, async (ctx) => {
    const userId = ctx.from?.id.toString();
    const category = ctx.match[1];
    await ctx.answerCbQuery();

    // Process the category selection
    await handleCategorySelection(ctx, userId, category);

    // Delete the message containing category selection buttons
    if (ctx.callbackQuery?.message) {
      ctx.deleteMessage(ctx.callbackQuery.message.message_id).catch((err) => {
        console.log("Error deleting message:", err);
      });
    }
  });
}

