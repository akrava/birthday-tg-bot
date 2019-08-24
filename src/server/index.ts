import Express from "express";
import { FindBirthdayForToday } from "@controller/birthday";
import { FindUserById } from "@controller/user";
import { bot } from "@telegram/index";
import { info, error } from "@service/logging";
import { greetings } from "@service/message";
import { howManyYears } from "@service/date";

export const app = Express();

app.use(bot.webhookCallback(process.env.WEBHOOK_TG_PATH));

app.get(process.env.CRON_PATH, async (_req, res) => {
    const bdays = await FindBirthdayForToday();
    if (!Array.isArray(bdays)) {
        error(new Error("cron failed"));
        res.status(204).send();
        return;
    }
    for (const bday of bdays) {
        const user = await FindUserById(bday.ownerTelegramID);
        if (!user) {
            error(new Error("Couldn't fetch user"));
            continue;
        }
        user.chatsId.forEach((chatId) => {
            bot.telegram.sendMessage(chatId, greetings(bday.name, howManyYears(bday.birthday)));
        });
    }
    info("cron executed");
    res.status(204).send();
});
