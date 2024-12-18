//users.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    favoriteSando: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sandwich"
    },
    bookmarkedSandos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sandwich"
      }
    ],
    triedSandos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sandwich"
      }
    ]
  },
  { collection: "users" }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
