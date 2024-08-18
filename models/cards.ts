import mongoose, { Document, Schema } from "mongoose";

export interface Cards extends Document {
  content: string;
  title: string;
  email: string;
  nextDay: string; // 'YYYY-MM-DD'
  time: number; // 复习次数
}

const CardsSchema = new Schema<Cards>({
  content: {
    type: String,
    required: [true, "Content is required"],
    index: true
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

export default mongoose.models.Cards || mongoose.model<Cards>("Cards", CardsSchema);
