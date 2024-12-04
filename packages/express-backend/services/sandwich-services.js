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

function addReview(id, review, newRating) {
  return findSandwichById(id)
    .then((s) => {
      const { reviews, rating } = s;
      const n = reviews.count;
      const avg = (rating * n + newRating)/(n + 1);
      return SandwichModel.updateOne({ _id: id }, 
    { 
      $push: { reviews: review },  
      $set: { rating: avg }
    }
      );
    });
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

function getSandwiches() {
  return SandwichModel.find();
}


export default {
  findSandwichById,
  addSandwich,
  addReview,
  getSandwichObject
};
