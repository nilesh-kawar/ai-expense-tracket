"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const start_1 = require("./start");
const help_1 = require("./help");
const summary_1 = require("./summary");
const today_1 = require("./today");
const text_1 = require("./text");
const addBanks_1 = require("./addBanks");
function registerCommands(bot, userStates) {
    (0, start_1.setupStartCommand)(bot, userStates);
    (0, help_1.setupHelpCommand)(bot);
    (0, summary_1.setupSummaryCommand)(bot);
    (0, today_1.setupTodayCommand)(bot);
    (0, addBanks_1.setupAddBanksCommand)(bot, userStates);
    (0, text_1.setupText)(bot, userStates);
}
