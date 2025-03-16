"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const db_utils_1 = require("../utils/db.utils");
const expense_model_1 = __importDefault(require("../models/expense.model"));
class UserService {
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_utils_1.DBUtils.findOne(user_model_1.default, { userId });
        });
    }
    static createUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_utils_1.DBUtils.create(user_model_1.default, data);
        });
    }
    static updateBankDetails(userId, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_utils_1.DBUtils.update(user_model_1.default, { userId }, { accounts });
        });
    }
    static addExpense(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_utils_1.DBUtils.create(expense_model_1.default, {
                userId,
                amount: data.amount,
                category: data.category,
                bank: data.account,
                description: `${data.category} expense` // Default description
            });
        });
    }
}
exports.UserService = UserService;
