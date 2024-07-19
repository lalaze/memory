import mongoose from "mongoose";

export interface Cards extends mongoose.Document {
  content: string;
  title: string;
  nextDay: string;  // 'YYYY-MM-DD'
  time: number; // 复习次数
}

const CardsSchema = new mongoose.Schema<Cards>({
  content: {
    type: String,
    required: [true, ""],
  },
  title: {
    type: String,
    required: [true, ""],
  },
  nextDay: {
    type: String,
    required: [true, ""],
  },
  time: {
    type: Number,
    required: [true, ""],
  }
});

export default mongoose.models.Cards || mongoose.model<Cards>("Cards", CardsSchema);
