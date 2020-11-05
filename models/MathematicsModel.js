const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mathematicsSchema = new Schema({
  resourceTitle: String,
  resourceLink: String,
  threadTitle: String,
  threadLink: String,
  repository: String,
  repositoryLink: String,
  difficultyLevel: String,
  disciplineTitle: String,
  disciplineLink: String,
  rating: Number,
  likes: Number,
  comments: [],
  searchTerm: String,
});

// On the model method of a mongoose object, pass in the parameter of:
// 1st param: which collection will be used in our database (recall that collections are lowercased and plural in MongoDB)
// 2nd param: which schema will be used to insert objects into the aforementioned collection
const Mathematics = mongoose.model(
  "mathematic",
  mathematicsSchema,
  "mathematics"
);

module.exports = Mathematics;
