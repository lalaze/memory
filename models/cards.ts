import mongoose, { Document, Schema } from "mongoose";

export interface Cards extends Document {
  content: string;
  title: string;
  nextDay: string; // 'YYYY-MM-DD'
  time: number; // 复习次数
}

const CardsSchema = new Schema<Cards>({
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  nextDay: {
    type: String,
    required: [true, "Next day is required"]
  },
  time: {
    type: Number,
    required: [true, "Time is required"]
  }
});

// Mongoose 会自动添加 _id 字段
export default mongoose.models.Cards || mongoose.model<Cards>("Cards", CardsSchema);
