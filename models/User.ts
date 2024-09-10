import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  credits: number;
  plan: string;
  unlockedImages: { prefix: string; qualities: string[] }[];
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  credits: { type: Number, default: 0 },
  plan: { type: String, default: "free" },
  unlockedImages: [
    {
      prefix: { type: String, required: true },
      qualities: { type: [String], required: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
