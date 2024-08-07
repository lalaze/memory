import mongoose, { Document, Schema } from "mongoose";

export interface Books extends Document {
  email: string;
  bookUrl: string;
  type: string;
}

const BooksSchema = new Schema<Books>({
  email: {
    type: String,
    index: true,
    required: [true, "email is required"],
  },
  bookUrl: {
    type: String,
    index: true,
    required: [true, "bookId is required"]
  },
  type: {
    type: String,
    index: true,
    required: [true, "type is required"]
  }
});

// Mongoose 会自动添加 _id 字段
export default mongoose.models.Books || mongoose.model<Books>("Books", BooksSchema);
