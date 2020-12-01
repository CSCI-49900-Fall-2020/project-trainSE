const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true, minlength: 5 },

  username: { type: String, required: true, unique: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  favoredRepositories: [],
  ribbons: [],
  likedResources: [],
  briefDescription: String,
  contributedResources: [],
  openThreads: [],
});

// On the model method of a mongoose object, pass in the parameter of:
// 1st param: which collection will be used in our database (recall that collections are lowercased and plural in MongoDB)
// 2nd param: which schema will be used to insert objects into the aforementioned collection
const User = mongoose.model("User", userSchema);

module.exports = User;

/* Thread collection
    Schema:
        name: 
        repository: python
        level: intermediate

    Thread.findbyCollection({repository: python})
    Python.getAll();
*/
