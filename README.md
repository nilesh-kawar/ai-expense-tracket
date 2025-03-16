# Expense Tracker Telegram Bot

A Telegram bot that helps you track your daily expenses using natural language processing.

## Features

- Track expenses using natural language (e.g., "spent 30 rs at McDonald's from HDFC bank")
- Automatically categorizes expenses using AI
- View daily expense summary
- View total expense summary
- MongoDB integration for persistent storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Telegram Bot Token (from @BotFather)
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   BOT_TOKEN=your_telegram_bot_token
   MONGODB_URI=your_mongodb_atlas_uri
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_API_ENDPOINT=https://models.inference.ai.azure.com
   OPENAI_MODEL=gpt-4o
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the bot:
   ```bash
   npm start
   ```

   For development with hot-reload:
   ```bash
   npm run dev
   ```

## Usage

1. Start a chat with your bot on Telegram
2. Send `/start` to get started
3. Send your expenses in natural language:
   - "spent 30 rs at McDonald's from HDFC bank"
   - "paid 500 rs for groceries using ICICI bank"
4. Use commands:
   - `/help` - Show help message
   - `/summary` - View total expense summary
   - `/today` - View today's expenses

## Development

- `npm run dev` - Start the bot in development mode
- `npm run build` - Build the TypeScript code
- `npm run watch` - Watch for changes and rebuild
- `npm start` - Start the bot in production mode 