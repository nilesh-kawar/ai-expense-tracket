import { Context, MiddlewareFn } from "telegraf";
import mongoose from "mongoose";

/**
 * Middleware to check if MongoDB is connected before executing a command.
 */
export const checkDatabaseMiddleware: MiddlewareFn<Context> = async (
  ctx,
  next
) => {
  if (mongoose.connection.readyState !== 1) {
    await ctx.reply(
      "⚠️ The database is currently down. Please try again later."
    );
    return; // Stop further execution
  }
  return next();
};
