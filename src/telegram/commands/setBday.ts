import { CreateBirthday, DeleteBirthdayById } from "@controller/birthday";
import { ContextMessageUpdate, Middleware } from "telegraf";
import { checkUser } from "@telegram/common";

const setBday: Middleware<ContextMessageUpdate> = async function(ctx) {
    const user = await checkUser(ctx);
    if (user === false) {
        return;
    }
    const lines = ctx.message.text.split(/[\r\n]+/);
    if ((await DeleteBirthdayById(user.telegramID)) !== true) {
        ctx.reply("error ocurred while deleting");
        return;
    }
    if (lines.length <= 1) {
        ctx.reply("Enter more then one line");
        return;
    }
    lines.splice(0, 1);
    const bdays = [];
    for (const line of lines) {
        const data = line.match(/\S+/g) || [];
        if (data.length !== 2) {
            ctx.reply("two params expected");
            continue;
        }
        const name = data[0];
        let birthday;
        try {
            birthday = new Date(data[1]);
        } catch (e) {
            ctx.reply("bad syntax of date");
            continue;
        }
        if (!(await CreateBirthday({ birthday, name, tgID: ctx.chat.id }))) {
            ctx.reply("error ocurred while creating");
        }
        bdays.push({ name, birthday });
    }
    let message = "";
    bdays.forEach((x) => message += `${x.name} ${x.birthday.toDateString()}\n`);
    ctx.reply(message);
    ctx.reply("successfully");
};

export default setBday;
