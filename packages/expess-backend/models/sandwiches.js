//sandwiches.js

import mongoose from "mongoose";

const SandwichSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      trim: true
    },
    cuisine: {
      type: String,
      required: false,
      trim: true
    },
    ingredients: {
      breads: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      },
      meats: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      },
      cheeses: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      },
      vegetables: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      },
      condiments: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      },
      spices: {
        type: Map,
        of: [String],
        required: false,
        trim: true
      }
    },
    cost: {
      type: Schema.Types.Decimal128,
      required: true,
      trim: true
    },
    calories: {
      type: Number,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      trim: true
    },
    dietary_tags: {
      type: Map,
      of: [String],
      required: false,
      trim: true
    },
    review_count: {
      type: Number,
      required: true,
      trim: true
    },
    reviews: {
      type: Map,
      of: [String],
      required: false,
      trim: true
    },
    name: {
      type: String,
      required: true
      trim: true
    }
  },
  { collection: "sandwiches" }
);

const SandwichModel = mongoose.model("Sandwich", sandwichSchema);

export default SandwichModel;
