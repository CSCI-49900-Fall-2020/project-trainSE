const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  repository: String,
  repositoryLink: String,
  beginnerThreads: [],
  intermediateThreads: [],
  advancedThreads: [],
});

// On the model method of a mongoose object, pass in the parameter of:
// 1st param: which collection will be used in our database (recall that collections are lowercased and plural in MongoDB)
// 2nd param: which schema will be used to insert objects into the aforementioned collection
const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
