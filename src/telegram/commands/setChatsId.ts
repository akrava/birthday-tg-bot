import { bot } from "@telegram/index";
import { ContextMessageUpdate, Middleware } from "telegraf";
import { SetChatsId as SetChatsIdController } from "@controller/user";
import { checkUser } from "@telegram/common";
import { error } from "@service/logging";

const setChatsId: Middleware<ContextMessageUpdate> = async function(ctx) {
    const user = await checkUser(ctx);
    if (user === false) {
        return;
    }
    const lines = ctx.message.text.split("\n");
    if (lines.length !== 2) {
        ctx.reply("bad syntax");
        return;
    }
    lines.splice(0, 1);
    const data = lines[0].split(/(\s+)/);
    let chatsId;
    try {
        chatsId = data.map(Number);
    } catch (e) {
        error(e);
        ctx.reply("bad syntax");
        return;
    }
    const botID = (await bot.telegram.getMe()).id;
    chatsId.filter(async (x) => {
        const chat = await bot.telegram.getChat(x);
        if (chat.type !== "private") {
            const admins = await bot.telegram.getChatAdministrators(x);
            const isUserAdmin = admins.some((y) => y.user.id === user.telegramID);
            const isBotAdmin = admins.some((y) => y.user.id === botID);
            return isBotAdmin && isUserAdmin;
        } else {
            return true;
        }
    });
    if ((await SetChatsIdController(user.telegramID, chatsId))) {
        ctx.reply(chatsId.reduce((prev, cur) => (prev.toString() + cur.toString() + "\n"), ""));
        ctx.reply("successfully");
    } else {
        ctx.reply("error ocurred");
    }
};

export default setChatsId;