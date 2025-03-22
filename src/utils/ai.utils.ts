import OpenAI from 'openai';
import { env } from '../config/env';

export class AIUtils {
  private static client: OpenAI;

  private static initClient() {
    if (!this.client) {
      const apiKey = env.GITHUB_TOKEN;
      const baseURL = env.MODEL_ENDPOINT;

      if (!apiKey) {
        throw new Error("⚠️ Missing OpenAI API Key! Set OPENAI_API_KEY in your .env file.");
      }

      this.client = new OpenAI({
        apiKey,
        baseURL,
      });
    }
    return this.client;
  }

  static async askAI(
    input: string,
    systemPrompt: string
  ): Promise<string> {
    try {
      const client = this.initClient();
      const response = await client.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
        temperature: Number(env.TEMPERATURE) || 0.7,
        top_p: Number(env.TOP_P) || 1.0,
        max_tokens: Number(env.MAX_TOKENS) || 1000,
        model: env.MODEL_NAME || "gpt-4o",
      });

      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("⚠️ OpenAI response is empty!");
      }

      return content;
    } catch (error: any) {
      console.error("🚨 AI Analysis Error:", error.message || error);
      throw new Error("❌ Failed to analyze input. Please try again.");
    }
  }
}

// Type guard for bank details validation
export interface BankDetails {
  isValid: boolean;
  bankNames: string[];
  message: string;
}

// Type guard for expense parsing
export interface Expense {
  isValid: boolean;
  amount: number | null;
  account: string | null;
  category: string | null;  
  message: string;
  description: string | null;
}

// Example system prompt for bank validation
export const BANK_VALIDATION_PROMPT = `
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
export const EXPENSE_PARSING_PROMPT = `
You are a financial expert AI that parses expense messages.
Analyze the user's input and extract the amount, account, and category.

Return only a valid JSON object with no extra text, explanations, or formatting. Do not add "json" or backticks around the response.

Example valid input: "1000 from HDFC Bank in ABC restaurant"
Example response:
{
  "isValid": true,
  "amount": 1000,
  "account": "HDFC Bank",
  "category": "Food",
  "message": "Valid expense message",
  "description": "ABC restaurant"
}

Example invalid input: "random message"
Example response:
{
  "isValid": false,
  "amount": null,
  "account": null,
  "category": null,
  "message": "Invalid expense message",
  "description": null
}

Also check if input message has all the information to parse the expense.
Example of invalid input: "1000 from HDFC Bank"
Example response:
{
  "isValid": false,
  "amount": null,
  "account": null,
  "category": null,
  "message": "Category is missing in the Expense message",
  "description": null
}

Available categories: ["Food","Groceries","Rent","Bills","Transport","Shopping","Entertainment","Health","Travel","Other"]

For example if user entered category is lunch then it should be mapped to Food category.

Strictly return a JSON object with no additional formatting or text.
`;

// Parse expense message
export const parseExpense = async (input: string): Promise<Expense> => {
  const response = await AIUtils.askAI(input, EXPENSE_PARSING_PROMPT);
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Invalid AI response format");
  }
};

// Validate bank details
export const validateBankDetails = async (input: string): Promise<BankDetails> => {
  const response = await AIUtils.askAI(input, BANK_VALIDATION_PROMPT);
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Invalid AI response format");
  }
};
