import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  credits: number;
  plan: string;
  unlockedImages: { prefix: string; qualities: string[] }[];
  paymentInfo: {
    last4: string;
    brand: string;
    subscriptionId: string;
    currentPeriodEnd: Date;
  };
  paymentHistory: {
    amount: number;
    currency: string;
    paymentDate: Date;
    paymentMethod: string;
    invoiceId: string;
  }[];
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
  paymentInfo: {
    last4: { type: String },
    brand: { type: String },
    subscriptionId: { type: String },
    currentPeriodEnd: { type: Date },
  },
  paymentHistory: [
    {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      paymentDate: { type: Date, required: true },
      paymentMethod: { type: String, required: true },
      invoiceId: { type: String, required: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
