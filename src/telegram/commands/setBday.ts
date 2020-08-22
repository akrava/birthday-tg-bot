import { CreateBirthday, DeleteBirthdayById } from "@controller/birthday";
import { Context, Middleware } from "telegraf";
import { checkUser } from "@telegram/common";
import { toFormatedString } from "@service/date";
import moment from "moment";

const setBday: Middleware<Context> = async function(ctx) {
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
        const data = line.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [];
        if (data.length !== 2) {
            ctx.reply("two params expected");
            continue;
        }
        const name = data[0].replace(/^['"]+|['"]+$/g, "");
        moment.locale("uk");
        const date = moment(data[1], "DD.MM.YY");
        if (!date.isValid()) {
            ctx.reply("bad syntax of date");
            continue;
        }
        const birthday = date.toDate();
        if (!(await CreateBirthday({ birthday, name, tgID: ctx.chat.id }))) {
            ctx.reply("error ocurred while creating");
        }
        bdays.push({ name, birthday });
    }
    let message = "";
    bdays.forEach((x) => message += `${x.name} ${toFormatedString(x.birthday)}\n`);
    ctx.reply(message);
};

export default setBday;
