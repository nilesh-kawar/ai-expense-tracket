import User, { IUser } from "../models/user.model";
import { DBUtils } from "../utils/db.utils";
import ExpenseModel from "../models/expense.model";

export class UserService {
  static async getUser(userId: string) {
    return await DBUtils.findOne(User, { userId });
  }

  static async createUser(userId: string, data: IUser) {
    return await DBUtils.create(User, data);
  }

  static async updateBankDetails(
    userId: string,
    accounts: string[]
  ) {
    return await DBUtils.update(User, { userId }, { accounts });
  }

  static async addExpense(userId: string, data: { 
    amount: number, 
    account: string, 
    category: string,
    description?: string 
  }) {
    return await DBUtils.create(ExpenseModel, {
      userId,
      amount: data.amount,
      category: data.category,
      bank: data.account,
      description: data.description || `${data.category} expense`, // Default description
    });
  }
}
