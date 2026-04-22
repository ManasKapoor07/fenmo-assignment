import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      index: true, 
    },

    idempotencyKey: {
      type: String,
      required: true,
      unique: true, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Expense", expenseSchema);