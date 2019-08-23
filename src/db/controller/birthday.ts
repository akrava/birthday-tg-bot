import Birthday, { IBirthday } from "@model/birthday";
import { isBirthdayTody } from "@service/date";
import { error } from "@service/logging";

export interface ICreateBirthdayInput {
    tgID: IBirthday["ownerTelegramID"];
    name: IBirthday["name"];
    birthday: IBirthday["birthday"];
}

export async function CreateBirthday(obj: ICreateBirthdayInput) {
    return Birthday.create({ ownerTelegramID: obj.tgID, name: obj.name, birthday: obj.birthday })
        .then((data: IBirthday) => data).catch((e: Error) => error(e));
}

export async function FindBirthdayForToday() {
    return Birthday.find().then((res) => res.filter((val) => isBirthdayTody(val.birthday)))
        .catch((e) => error(e));
}
