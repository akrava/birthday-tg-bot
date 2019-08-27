import User, { IUser } from "@model/user";
import Birthday from "@model/birthday";
import { error } from "@service/logging";

export interface ICreateUserInput {
    telegramID: IUser["telegramID"];
    chatsId?: IUser["chatsId"];
}

export async function CreateUser(obj: ICreateUserInput) {
    return User.create({ telegramID: obj.telegramID, chatsId: obj.chatsId })
        .then((data: IUser) => data).catch((e: Error) => error(e));
}

export async function FindUserById(tgId: IUser["telegramID"]) {
    return User.findOne({ telegramID: tgId })
        .then((data: IUser) => data || false).catch((e: Error) => error(e));
}

export async function SetChatsId(tgId: IUser["telegramID"], chatsID: IUser["chatsId"]) {
    return User.findOneAndUpdate({ telegramID: tgId }, { $set: { chatsID } }, { new: true, upsert: true })
        .then(() => true).catch((e) => (error(e), false));
}

export async function DeleteUser(tgId: IUser["telegramID"]) {
    return Birthday.deleteMany({ ownerTelegramID: tgId })
        .then((res) => res.ok === 1 && User.deleteOne({ telegramID: tgId }))
        .then((res) => res.ok === 1).catch((e) => (error(e), false));
}
