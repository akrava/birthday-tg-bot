import { CreateBirthday, DeleteBirthdayById } from "@controller/birthday";
import { ContextMessageUpdate, Middleware } from "telegraf";
import { checkUser } from "@telegram/common";

const setBday: Middleware<ContextMessageUpdate> = async function(ctx) {
    const user = await checkUser(ctx);
    if (user === false) {
        return;
    }
    const lines = ctx.message.text.split("\n");
    if ((await DeleteBirthdayById(ctx.chat.id)) !== true) {
        ctx.reply("error ocurred");
        return;
    }
    for (const line of lines) {
        const data = line.split(/(\s+)/);
        if (data.length !== 2) {
            ctx.reply("bad syntax");
            continue;
        }
        const name = data[0];
        let birthday;
        try {
            birthday = new Date(data[1]);
        } catch (e) {
            ctx.reply("bad syntax");
            continue;
        }
        if (!(await CreateBirthday({ birthday, name, tgID: ctx.chat.id }))) {
            ctx.reply("error ocurred");
        }
    }
    ctx.reply("successfully");
};

export default setBday;
