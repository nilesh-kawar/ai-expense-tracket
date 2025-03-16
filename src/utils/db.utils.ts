import mongoose, { Model, FilterQuery, UpdateQuery, Document } from "mongoose";

export class DBUtils {
  /**
   * Creates a new document in the database.
   * @param model Mongoose model
   * @param data Object containing the data to insert
   * @returns Created document
   */
  static async create<T extends Document>(
    model: Model<T>,
    data: Partial<T>
  ): Promise<T | null> {
    try {
      const newData = new model(data);
      return await newData.save();
    } catch (error) {
      console.error(`Error creating document in ${model.modelName}:`, error);
      return null;
    }
  }

  /**
   * Finds one document based on a filter.
   * @param model Mongoose model
   * @param filter Filter query to find the document
   * @returns Found document
   */
  static async findOne<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>
  ): Promise<T | null> {
    try {
      return await model.findOne(filter);
    } catch (error) {
      console.error(`Error finding document in ${model.modelName}:`, error);
      return null;
    }
  }

  /**
   * Finds multiple documents based on a filter.
   * @param model Mongoose model
   * @param filter Filter query to find the documents
   * @returns Array of found documents
   */
  static async findMany<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>
  ): Promise<T[]> {
    try {
      return await model.find(filter);
    } catch (error) {
      console.error(`Error finding documents in ${model.modelName}:`, error);
      return [];
    }
  }

  /**
   * Updates a document in the database.
   * @param model Mongoose model
   * @param filter Filter query to find the document
   * @param update Update object containing changes
   * @returns Updated document
   */
  static async update<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    try {
      return await model.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      console.error(`Error updating document in ${model.modelName}:`, error);
      return null;
    }
  }

  /**
   * Deletes a document from the database.
   * @param model Mongoose model
   * @param filter Filter query to find the document
   * @returns Deletion success status
   */
  static async deleteOne<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>
  ): Promise<boolean> {
    try {
      const result = await model.deleteOne(filter);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document from ${model.modelName}:`, error);
      return false;
    }
  }

  /**
   * Deletes multiple documents from the database.
   * @param model Mongoose model
   * @param filter Filter query to find the documents
   * @returns Deletion success status
   */
  static async deleteMany<T extends Document>(
    model: Model<T>,
    filter: FilterQuery<T>
  ): Promise<boolean> {
    try {
      const result = await model.deleteMany(filter);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(
        `Error deleting multiple documents from ${model.modelName}:`,
        error
      );
      return false;
    }
  }
}
