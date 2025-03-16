import { Markup } from "telegraf";
import { UserService } from "./user.service";
import { Expense, parseExpense } from "../utils/ai.utils";

const pendingExpenses = new Map<string, any>(); // Stores temp data while waiting for input

export async function handleExpenseMessage(
  ctx: any,
  userId: string,
  userInput: string
) {
  const parsedData: Expense = await parseExpense(userInput);
  console.log("parsedData--", parsedData);
  let { amount, account, category } = parsedData;

  // Fetch user accounts from DB
  const user = await UserService.getUser(userId);
  if (!user)
    return ctx.reply(
      "⚠️ User not found in DB!!! \n Please tap on /start to start the bot"
    );

  // Store temporary expense data
  pendingExpenses.set(userId, { amount, account, category });
  // If account is missing, ask user to select one
  if (!account) {
    return ctx.reply(
      "🧐 From which account should I add this expense?",
      Markup.inlineKeyboard(
        user.accounts.map((acc) =>
          Markup.button.callback(acc, `SELECT_ACCOUNT_${acc}`)
        ),
        { columns: 2 }
      )
    );
  }

  // If category is missing, ask user to select one
  if (!category) {
    return ctx.reply("🧐 What type of expense is this??", 
      Markup.inlineKeyboard(
        user.categories.map((cat) =>
          Markup.button.callback(cat, `SELECT_CATEGORY_${cat}`)
        ),
        { columns: 3 }
      ),
    );
  }

  // Save the expense
  //   await UserService.addExpense(userId, { amount, account, category });
  const expense = await UserService.addExpense(userId, {
    amount: amount || 0,
    account,
    category,
  });
  console.log("expense====", expense);

  if (!expense) return ctx.reply("⚠️ Failed to add expense!");
  ctx.reply(`✅ Added ₹${amount} under "${category}" from ${account}!`);
}

// Handles account selection
export async function handleAccountSelection(
  ctx: any,
  userId: string,
  account: string
) {
  const expense = pendingExpenses.get(userId);
  if (!expense) return ctx.reply("⚠️ No pending expense found!");

  expense.account = account;

  // If category is still missing, ask for it
  if (!expense.category) {
    const user = await UserService.getUser(userId);
    if (!user)
      return ctx.reply(
        "⚠️ User not found in DB!!! \n Please tap on /start to start the bot"
      );
    return ctx.reply("🧐 What type of expense is this?", {
      ...Markup.inlineKeyboard(
        user.categories.map((cat) =>
          Markup.button.callback(cat, `SELECT_CATEGORY_${cat}`)
        )
      ),
    });
  }

  // Save if category is present
  await saveExpense(
    ctx,
    userId,
    expense.amount,
    expense.account,
    expense.category
  );
}

// Handles category selection
export async function handleCategorySelection(
  ctx: any,
  userId: string,
  category: string
) {
  const expense = pendingExpenses.get(userId);
  if (!expense) return ctx.reply("⚠️ No pending expense found!\n Please add expense again");

  expense.category = category;

  // If account is still missing, ask for it
  if (!expense.account) {
    const user = await UserService.getUser(userId);
    if (!user)
      return ctx.reply(
        "⚠️ User not found in DB!!! \n Please tap on /start to start the bot"
      );
    return ctx.reply("🧐 From which account should I add this expense?", {
      ...Markup.inlineKeyboard(
        user.accounts.map((acc) =>
          Markup.button.callback(acc, `SELECT_ACCOUNT_${acc}`)
        )
      ),
    });
  }

  // Save if account is present
  await saveExpense(
    ctx,
    userId,
    expense.amount,
    expense.account,
    expense.category
  );
}

// Saves the expense to the DB
async function saveExpense(
  ctx: any,
  userId: string,
  amount: number,
  account: string,
  category: string
) {
  const expense = await UserService.addExpense(userId, {
    amount,
    account,
    category,
  });
  console.log("expense====", expense);

  if (!expense) return ctx.reply("⚠️ Failed to add expense!");

  pendingExpenses.delete(userId);
  ctx.reply(`✅ Added ₹${amount} under "${category}" from ${account}!`);
}
