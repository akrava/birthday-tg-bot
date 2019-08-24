import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IBirthday extends Document {
    ownerTelegramID: number;
    name: string;
    birthday: Date;
}

const BirthdaySchema: Schema = new Schema({
    ownerTelegramID: { type: Number, required: true },
    name:            { type: String, required: true },
    birthday:        { type: Date,   required: true }
});

export default mongoose.model<IBirthday>("Birthday", BirthdaySchema);
