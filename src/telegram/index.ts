import Telegraf from "telegraf";
import { error } from "@service/logging";
import startCb from "@commands/start";
import setBday from "@commands/setBday";
import setChatsId from "@commands/setChatsId";
import help from "@commands/help";

export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(startCb);
bot.command("set_bd", setBday);
bot.command("set_chats", setChatsId);
bot.help(help);

bot.catch((err: Error) => error(err));
