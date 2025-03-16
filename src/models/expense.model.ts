import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: string;
  amount: number;
  category: string;
  description: string;
  bank: string;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  bank: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema); 