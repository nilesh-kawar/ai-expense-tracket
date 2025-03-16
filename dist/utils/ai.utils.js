"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBankDetails = exports.parseExpense = exports.EXPENSE_PARSING_PROMPT = exports.BANK_VALIDATION_PROMPT = exports.AIUtils = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
class AIUtils {
    static initClient() {
        if (!this.client) {
            const apiKey = env_1.env.GITHUB_TOKEN;
            const baseURL = env_1.env.MODEL_ENDPOINT;
            if (!apiKey) {
                throw new Error("⚠️ Missing OpenAI API Key! Set OPENAI_API_KEY in your .env file.");
            }
            this.client = new openai_1.default({
                apiKey,
                baseURL,
            });
        }
        return this.client;
    }
    static askAI(input, systemPrompt) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const client = this.initClient();
                const response = yield client.chat.completions.create({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: input },
                    ],
                    temperature: Number(env_1.env.TEMPERATURE) || 0.7,
                    top_p: Number(env_1.env.TOP_P) || 1.0,
                    max_tokens: Number(env_1.env.MAX_TOKENS) || 1000,
                    model: env_1.env.MODEL_NAME || "gpt-4o",
                });
                const content = (_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
                if (!content) {
                    throw new Error("⚠️ OpenAI response is empty!");
                }
                return content;
            }
            catch (error) {
                console.error("🚨 AI Analysis Error:", error.message || error);
                throw new Error("❌ Failed to analyze input. Please try again.");
            }
        });
    }
}
exports.AIUtils = AIUtils;
// Example system prompt for bank validation
exports.BANK_VALIDATION_PROMPT = `
You are a banking expert AI that validates bank and credit card names.
Analyze the user's input and determine if they are providing valid bank or credit card names.

Return only a valid JSON object with no extra text, explanations, or formatting. Do not add "json" or backticks around the response.

Example valid input: "hdfc bank, sbi, axis credit card"
Example response:
{
  "isValid": true,
  "bankNames": ["HDFC Bank", "SBI", "Axis Credit Card"],
  "message": "Valid bank and credit card names provided"
}

Example invalid input: "my bank, random card"
Example response:
{
  "isValid": false,
  "bankNames": [],
  "message": "Please provide valid bank or credit card names"
}

Strictly return a JSON object with no additional formatting or text.
`;
// Example system prompt for expense parsing
exports.EXPENSE_PARSING_PROMPT = `
You are a financial expert AI that parses expense messages.
Analyze the user's input and extract the amount, account, and category.

Return only a valid JSON object with no extra text, explanations, or formatting. Do not add "json" or backticks around the response.

Example valid input: "1000 from HDFC Bank for food"
Example response:
{
  "isValid": true,
  "amount": 1000,
  "account": "HDFC Bank",
  "category": "Food",
  "message": "Valid expense message"
}

Example invalid input: "random message"
Example response:
{
  "isValid": false,
  "amount": null,
  "account": null,
  "category": null,
  "message": "Invalid expense message"
}

Also check if input message has all the information to parse the expense.
Example of invalid input: "1000 from HDFC Bank"
Example response:
{
  "isValid": false,
  "amount": null,
  "account": null,
  "category": null,
  "message": "Category is missing in the Expense message"
}

Available categories: ["Food","Groceries","Rent","Bills","Transport","Shopping","Entertainment","Health","Travel","Other"]

For example if user entered category is lunch then it should be mapped to Food category.

Strictly return a JSON object with no additional formatting or text.
`;
// Parse expense message
const parseExpense = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield AIUtils.askAI(input, exports.EXPENSE_PARSING_PROMPT);
    try {
        return JSON.parse(response);
    }
    catch (error) {
        console.error("Error parsing AI response:", error);
        throw new Error("Invalid AI response format");
    }
});
exports.parseExpense = parseExpense;
// Validate bank details
const validateBankDetails = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield AIUtils.askAI(input, exports.BANK_VALIDATION_PROMPT);
    try {
        return JSON.parse(response);
    }
    catch (error) {
        console.error("Error parsing AI response:", error);
        throw new Error("Invalid AI response format");
    }
});
exports.validateBankDetails = validateBankDetails;
