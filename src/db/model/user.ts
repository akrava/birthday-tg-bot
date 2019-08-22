import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IUser extends Document {
    telegramID: number;
    chatsId: number[];
}

const UserSchema: Schema = new Schema({
    telegramID: { type: Number,   required: true, unique: true },
    chatsId:    { type: [Number], required: true, default: []},
});

export default mongoose.model<IUser>("User", UserSchema);
