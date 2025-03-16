import { Markup } from "telegraf";
import { BankDetails, validateBankDetails } from "../utils/ai.utils";
import { UserService } from "./user.service";

/**
 * Handles bank detail validation and updates user data.
 */
export async function handleBankDetails(ctx: any, userId: string, userInput: string, userStates: Map<string, string>) {
  const response: BankDetails = await validateBankDetails(userInput);
  if (response.isValid) {
    userStates.delete(userId);
    await UserService.updateBankDetails(userId!, response.bankNames);

    const formattedMessage = formatBankDetails(response.bankNames);
    await ctx.reply(formattedMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        Markup.button.callback("✏️ Edit", "EDIT_BANKS"),
        Markup.button.callback("🚀 Start Tracking Expenses", "START_TRACKING"),
      ]),
    });
  } else {
    await ctx.reply("❌ Invalid bank details: " + response.message);
  }
}

/**
 * Formats bank and credit card names separately.
 */
export function formatBankDetails(bankNames: string[]): string {
  const banks = bankNames
    .filter((name) => !name.toLowerCase().includes("credit card"))
    .map((name) => `🏦 ${name}`)
    .join("\n");

  const creditCards = bankNames
    .filter((name) => name.toLowerCase().includes("credit card"))
    .map((name) => `💳 ${name}`)
    .join("\n");

  return (
    `<b>✅ Successfully Added:</b>\n\n` +
    (banks ? `<b>Banks:</b>\n${banks}\n\n` : "") +
    (creditCards ? `<b>Credit Cards:</b>\n${creditCards}\n\n` : "") +
    "What would you like to do next? 👇"
  );
}
