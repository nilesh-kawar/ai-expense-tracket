import { Markup, Telegraf } from "telegraf";
import { UserService } from "../user.service";
import userModel from "../../models/user.model";

export function setupStartCommand(bot: Telegraf, userStates: Map<string, string>) {
  bot.command("start", async (ctx: any) => {
    const userId = ctx.from?.id.toString();
    const userName = ctx.from?.username;
    const firstName = ctx.from?.first_name;

    const user = await UserService.getUser(userId!);
    console.log("Received /start command from:", userName);

    await ctx.reply(
      "👋 <b>Yo, I'm your personal expense tracker bot!</b> \n\n" +
        "Just <b>drop your expenses</b> or <b>forward transaction SMS</b> my way 💸📩\n\n" +
        "I'll handle the rest! 🚀",
      { parse_mode: "HTML" }
    );

    if (!user) {
      await ctx.reply(
        "👀 Hey, looks like you're new here!\n\n" +
          "Drop your bank & credit card names like this:\n" +
          "👉 HDFC Bank, SBI Credit Card\n\n" +
          "Let's get this 💸 tracking started! 🚀",
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            Markup.button.callback("➕💳 Add Bank & Card Names", "ADD_BANKS"),
          ]),
        }
      );
      // const categories = await UserService.getCategories(userId!);
      const categories = ["Food","Groceries","Rent","Bills","Transport","Shopping","Entertainment","Health","Travel","Other"];
      const newUserData = new userModel({
        userId: userId!,
        name: firstName || "Unknown User",
        accounts: [],
        categories: categories,
      });

      await UserService.createUser(userId!, newUserData);
    }
  });

  // Handle the button click
  bot.action("ADD_BANKS", async (ctx) => {
    const userId = ctx.from?.id.toString();
    await ctx.answerCbQuery(); // Acknowledge button press
    await ctx.reply(
      "🔹 Please send your bank & credit card names like this:\n👉 HDFC Bank, SBI Credit Card"
    );
    userStates.set(userId, "waiting_for_banks"); // Set user state
  });
}
