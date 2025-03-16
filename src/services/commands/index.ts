import { Telegraf } from "telegraf";
import { setupStartCommand } from "./start";
import { setupHelpCommand } from "./help";
import { setupSummaryCommand } from "./summary";
import { setupTodayCommand } from "./today";
import { setupText } from "./text";
import { setupAddBanksCommand } from "./addBanks";

export function registerCommands(bot: Telegraf, userStates: Map<string, string>) {
  setupStartCommand(bot, userStates);
  setupHelpCommand(bot);
  setupSummaryCommand(bot);
  setupTodayCommand(bot);
  setupAddBanksCommand(bot, userStates);
  setupText(bot, userStates);
}
