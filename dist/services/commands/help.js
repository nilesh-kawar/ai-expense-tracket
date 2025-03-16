"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHelpCommand = setupHelpCommand;
function setupHelpCommand(bot) {
    bot.command("help", (ctx) => {
        ctx.reply("Usage Guide:\n" +
            '- "spent 50 rs at Starbucks from ICICI"\n' +
            '- "/summary" for expenses summary\n' +
            '- "/today" for today\'s expenses');
    });
}
