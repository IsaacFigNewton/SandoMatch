//ingredient-info.js

import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema(
  {
    cost: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      trim: true
    },
    calories: {
      type: Number,
      required: true,
      trim: true
    }
  }
);

const InfoModel = mongoose.model(
  "IngredientInfo",
  InfoSchema
);

export default InfoModel;
