import mongoose, { Document, Schema } from "mongoose";

export interface Selection {
  cfi: string;
  cfiBase: string;
  bookName: string;
  color: string;
  content: string;
  text: string;
  tags: string[];
}

export type SelectionList = Selection & {
  id: string
}

type SelectionD = Document & Selection & {
  email: string;
}

const SelectionSchema = new Schema<SelectionD>({
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

export default mongoose.models.Selection || mongoose.model<SelectionD>("Selection", SelectionSchema);
