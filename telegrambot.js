const TelegramBot = require("node-telegram-bot-api");

// Telegram token from Railway or env
const token = process.env.TELEGRAM_TOKEN;

// Your private group link
const groupLink = "https://t.me/+DPpAqO-50pM3MTE8";

const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Telegram bot is running...");

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

bot.sendMessage(
chatId,
"✅ You have been verified successfully!\n\nClick below to join the private group:",
{
reply_markup: {
inline_keyboard: [
[
{
text: "🚀 Join Private Group",
url: groupLink
}
]
]
}
}
);

});
