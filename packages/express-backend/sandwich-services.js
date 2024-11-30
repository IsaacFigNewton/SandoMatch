//sandwich-services.js
import mongoose from "mongoose";
import SandwichModel from "../models/sandwiches.js";

mongoose.set("debug", true);


function findSandwichById(id) {
  return SandwichModel.findById(id);
}

function addSandwich(sandwich) {
  const sandwichToAdd = new SandwichModel(sandwich);
  const promise = sandwichToAdd.save();
  return promise;
}

function addReview(id, review, rating) {
  const ratings = [db.sandwiches.findSandwichById(id).rating, rating];
  const reviewToAdd = db.sandwiches.updateOne({ _id: id }, 
    { 
      $push: { reviews: review }, 
      $inc: { review_count: 1 }, 
      $set: { rating: ratings }
    }
  );
  const promise = reviewToAdd.save();
  return promise;
}


function getSandwichObject(id) {
  let promise;
  if (id) {
    promise = findSandwichById(id);
  } else {
    promise = SandwichModel.find();
  }
  return promise;
}


export default {
  findSandwichById,
  addSandwich,
  addReview,
  getSandwichObject
};
