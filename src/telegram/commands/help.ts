import { ContextMessageUpdate, Middleware } from "telegraf";

const help: Middleware<ContextMessageUpdate> = async function(ctx) {
    ctx.reply(
        "Tap /start to get started.\n" +
        "Enter birtdays in such format:\n" +
        "***\n" +
        "/set_bd\n" +
        "Vasya xx.yy.zz\n" +
        "Petya xx.yy.zz\n" +
        "Natasha xx.yy.zz\n" +
        "...\n" +
        "***\n" +
        "Enter chats ID to send greetings in such format:\n" +
        "***\n" +
        "/set_chats\n" +
        "xxxx xxxx xxxx xxxx\n" +
        "***\n" +
        "Chats id you can get here: @userinfobot\n" +
        "/get_id to get id of group chat"
    );
};

export default help;
