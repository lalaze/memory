import mongoose, { Document, Schema } from "mongoose";

export interface Cards extends Document {
  content: Map<string, any>;
  title: string;
  email: string;
  nextDay: string; // 'YYYY-MM-DD'
  time: number; // 复习次数
}

const CardsSchema = new Schema<Cards>({
  content: {
    type: Map,
    required: [true, "Content is required"],
    of: Schema.Types.Mixed
  },
  email: {
    type: String,
    index: true,
    required: [true, "email is required"],
  },
  title: {
    type: String,
    index: true,
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
