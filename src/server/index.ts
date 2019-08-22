import Express from "express";
import { bot } from "@telegram/index";
import { info } from "@service/logging";

export const app = Express();

app.use(bot.webhookCallback(process.env.WEBHOOK_TG_PATH));

app.get(process.env.CRON_PATH, async (_req, res) => {
    info("cron executed");
    res.status(204).send();
});
