// import User, { IUser } from "@model/user";
// import { error } from "@service/logging";

// export interface ICreateUserInput {
//     telegramID: IUser["telegramID"];
//     gmailID?: IUser["gmailID"];
//     chatsId?: IUser["chatsId"];
//     expire?: IUser["expire"];
// }

// export async function CreateUser(obj: ICreateUserInput) {
//     return User.create({
//             telegramID: obj.telegramID,
//             gmailID: obj.gmailID,
//             chatsId: obj.chatsId,
//             expire: obj.expire
//         })
//         .then((data: IUser) => {
//             return data;
//         })
//         .catch((e: Error) => {
//             error(e);
//         });
// }

// export async function FindUserById(tgId: IUser["telegramID"]) {
//     return User.findOne({ telegramID: tgId })
//         .then((data: IUser) => {
//             return data || false;
//         })
//         .catch((e: Error) => {
//             error(e);
//         });
// }

// export async function DeleteUser(tgId: IUser["telegramID"]) {
//     return User.deleteOne({ telegramID: tgId })
//         .then((res) => {
//             return res.ok === 1;
//         })
//         .catch((e: Error) => {
//             error(e);
//             return false;
//         });
// }
