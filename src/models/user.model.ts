import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  name: string;
  accounts: string[];  // Simple array of account names
  categories: string[];
  createdAt?: Date;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  accounts: [{ type: String }],  // Array of strings for account names
  categories: [{ type: String }],  // Array of strings for category names
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
