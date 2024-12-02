//reviews.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true
    },
    sandwich: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sandwich",
      required: true
    }
  },
  { collection: "reviews" }
);

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
