import Telegraf from "telegraf";
import { error } from "@service/logging";
import startCb from "@commands/start";
import setBday from "@commands/setBday";

export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(startCb);
bot.command("set_bd", setBday);

bot.catch((err: Error) => error(err));
