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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUtils = void 0;
class DBUtils {
    /**
     * Creates a new document in the database.
     * @param model Mongoose model
     * @param data Object containing the data to insert
     * @returns Created document
     */
    static create(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = new model(data);
                return yield newData.save();
            }
            catch (error) {
                console.error(`Error creating document in ${model.modelName}:`, error);
                return null;
            }
        });
    }
    /**
     * Finds one document based on a filter.
     * @param model Mongoose model
     * @param filter Filter query to find the document
     * @returns Found document
     */
    static findOne(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.findOne(filter);
            }
            catch (error) {
                console.error(`Error finding document in ${model.modelName}:`, error);
                return null;
            }
        });
    }
    /**
     * Finds multiple documents based on a filter.
     * @param model Mongoose model
     * @param filter Filter query to find the documents
     * @returns Array of found documents
     */
    static findMany(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.find(filter);
            }
            catch (error) {
                console.error(`Error finding documents in ${model.modelName}:`, error);
                return [];
            }
        });
    }
    /**
     * Updates a document in the database.
     * @param model Mongoose model
     * @param filter Filter query to find the document
     * @param update Update object containing changes
     * @returns Updated document
     */
    static update(model, filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.findOneAndUpdate(filter, update, { new: true });
            }
            catch (error) {
                console.error(`Error updating document in ${model.modelName}:`, error);
                return null;
            }
        });
    }
    /**
     * Deletes a document from the database.
     * @param model Mongoose model
     * @param filter Filter query to find the document
     * @returns Deletion success status
     */
    static deleteOne(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.deleteOne(filter);
                return result.deletedCount > 0;
            }
            catch (error) {
                console.error(`Error deleting document from ${model.modelName}:`, error);
                return false;
            }
        });
    }
    /**
     * Deletes multiple documents from the database.
     * @param model Mongoose model
     * @param filter Filter query to find the documents
     * @returns Deletion success status
     */
    static deleteMany(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.deleteMany(filter);
                return result.deletedCount > 0;
            }
            catch (error) {
                console.error(`Error deleting multiple documents from ${model.modelName}:`, error);
                return false;
            }
        });
    }
}
exports.DBUtils = DBUtils;
