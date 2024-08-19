import mongoose, { Document, Schema } from "mongoose";

export interface Selection extends Document {
  email: string;
  cfi: string;
  cfiBase: string;
  bookName: string;
  color: string;
  content: string;
  text: string;
  tags: string[];
}

const SelectionSchema = new Schema<Selection>({
  email: {
    type: String,
    index: true,
    required: [true, "email is required"],
  },
  cfi: {
    type: String,
    index: true,
    required: [true, "cfi is required"]
  },
  cfiBase: {
    type: String,
    index: true,
    required: [true, "cfiBase is required"]
  },
  text: {
    type: String,
    index: true,
    required: [true, "text is required"]
  },
  bookName: {
    type: String,
    index: true,
    required: [true, "bookId is required"]
  },
  color: {
    type: String,
    index: true,
    required: [true, "color is required"]
  },
  content: {
    type: String,
    index: true
  },
  tags: {
    type: [String],
    index: true
  },
});

export default mongoose.models.Selection || mongoose.model<Selection>("Selection", SelectionSchema);
