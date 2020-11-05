const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const domainSchema = new Schema({
  discipline: String,
  repositories: [],
});

// On the model method of a mongoose object, pass in the parameter of:
// 1st param: which collection will be used in our database (recall that collections are lowercased and plural in MongoDB)
// 2nd param: which schema will be used to insert objects into the aforementioned collection
const Domain = mongoose.model("Domain", domainSchema);

module.exports = Domain;
