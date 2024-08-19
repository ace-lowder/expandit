import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  credits: number;
  plan: "free" | "silver" | "gold";
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  plan: {
    type: String,
    enum: ["free", "silver", "gold"],
    default: "free",
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
