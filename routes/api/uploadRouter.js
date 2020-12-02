const router = require("express").Router();
const auth = require("../../middleware/auth");
const {
  lowercaseDashify,
  getTimeStamp,
} = require("../../middleware/helperFunctions");
const User = require("../../models/UserModel");
const Algorithm = require("../../models/AlgorithmsModel");
const Architecture = require("../../models/ArchitectureModel");
const Database = require("../../models/DatabaseModel");
const Language = require("../../models/LanguageModel");
const Mathematics = require("../../models/MathematicsModel");
const Ai = require("../../models/AIModel");
const Thread = require("../../models/ThreadModel");

// @route    POST api/upload/resource
// @desc     Upload a resource to MongoDB (resource sent from ResouceCreation.js)
// @access   Private
router.post("/resource", auth, async (req, res) => {
  // resourceTitle: String,
  // resourceLink: String,
  // resourceType: String,
  // threadTitle: String,
  // threadLink: String,
  // repository: String,
  // repositoryLink: String,
  // difficultyLevel: String,
  // disciplineTitle: String,
  // disciplineLink: String,
  // rating: Number,
  // likes: Number,
  // dislikes: Number,
  // submittedWhen: String,
  // submittedBy: String,
  // likedBy: [],
  // dislikedBy: [],
  // comments: [],
  // searchTerm: String,
  let {
    resourceTitle,
    resourceLink,
    resourceType,
    threadTitle,
    repository,
    difficultyLevel,
    disciplineTitle,
    submittedBy,
  } = req.body;
  // Reformat the data to be ready for backend submission
  const threadLink = lowercaseDashify(threadTitle);
  const repositoryLink = lowercaseDashify(repository);
  const disciplineLink = lowercaseDashify(disciplineTitle);

  console.log(threadLink, repositoryLink, disciplineLink);

  // Determine which domain this resource belongs to
  // This will determine which collection to add our resource in
  let whichDomain = "";
  switch (disciplineLink) {
    case "languages":
      whichDomain = Language;
      break;
    case "mathematics":
      whichDomain = Mathematics;
      break;
    case "databases":
      whichDomain = Database;
      break;
    case "architecture":
      whichDomain = Architecture;
      break;
    case "algorithms-and-data-structures":
      whichDomain = Algorithm;
      break;
    case "artificial-intelligence":
      whichDomain = Ai;
      break;
    default:
  }

  // Create a new resource using a schema
  const newResource = new whichDomain({
    resourceTitle: resourceTitle,
    resourceLink: resourceLink,
    resourceType: resourceType,
    threadTitle: threadTitle,
    threadLink: threadLink,
    repository: repository,
    repositoryLink: repositoryLink,
    difficultyLevel: difficultyLevel,
    disciplineTitle: disciplineTitle,
    disciplineLink: disciplineLink,
    rating: 0,
    likes: 0,
    submittedWhen: getTimeStamp(),
    submittedBy: submittedBy,
    likedBy: [],
    comments: [],
    searchTerm: "",
  });

  console.log(newResource);
  // Save the resource onto MongoDB
  const savedResource = await newResource.save();
  console.log(savedResource);

  // Credit the user who saved the resource
  const creditUser = await User.findOneAndUpdate(
    { username: submittedBy },
    { $push: { contributedResources: savedResource } },
    { useFindAndModify: false }
  );
  console.log(creditUser);

  // Send a success response to the frontend
  return res.json({ response: "From backend to frontend" });
});

// @route    GET api/upload/resource/comment/:discipline/:id
// @desc     Push a comment to a resource on the backend (sent from ResourcePage.js/CommentForm.js)
// @access   Private
router.post("/resource/comment/:discipline/:id", auth, async (req, res) => {
  // Create a new comment object to push on a resource's comment array
  const newComment = {
    author: req.body.author,
    text: req.body.text,
    timeStamp: getTimeStamp(),
  };

  // Determine which domain this resource belongs to
  // This will determine which collection to add our resource in
  let whichDomain = "";
  switch (req.params.discipline) {
    case "languages":
      whichDomain = Language;
      break;
    case "mathematics":
      whichDomain = Mathematics;
      break;
    case "databases":
      whichDomain = Database;
      break;
    case "architecture":
      whichDomain = Architecture;
      break;
    case "algorithms-and-data-structures":
      whichDomain = Algorithm;
      break;
    case "artificial-intelligence":
      whichDomain = Ai;
      break;
    default:
  }
  // console.log("Resource domain: ", whichDomain);

  // push flag allows to add the object to the array of comments
  const result = await whichDomain.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { comments: [newComment] } },
    { useFindAndModify: false }
  );
  //   console.log("this is the result from backend:  ");
  //   console.log(result);

  // Send the comment (that was just inserted to the comments array) to the frontend
  return res.json({ response: newComment });
});

// @route    POST api/upload/likeResource/:discipline/:id/:username
// @desc     Decrement the like count of a resource on the backend (sent from ResourcePage.js)
// @access   Private
router.post(
  "/resource/likeResource/:discipline/:id/:username",
  auth,
  async (req, res) => {
    let { discipline, id, username } = req.params;
    console.log("----------In the likeResource route-----------------");
    // Determine which domain this resource belongs to
    // This will determine which collection to add our resource in
    let whichDomain = "";
    switch (discipline) {
      case "languages":
        whichDomain = Language;
        break;
      case "mathematics":
        whichDomain = Mathematics;
        break;
      case "databases":
        whichDomain = Database;
        break;
      case "architecture":
        whichDomain = Architecture;
        break;
      case "algorithms-and-data-structures":
        whichDomain = Algorithm;
        break;
      case "artificial-intelligence":
        whichDomain = Ai;
        break;
      default:
    }
    console.log("Resource domain: ", whichDomain);

    // updateOne first parameter is document we want to find, second parameter is the changes we want to make
    let result = await whichDomain.updateOne(
      // $ne means if the username is not equal to any element in likedBy
      { _id: id, likedBy: { $ne: username } }, // Query: find the document in the database with the id and username the client provided
      { $inc: { likes: 1 }, $push: { likedBy: username } }
    ); // Change: change that found resource document's total likes and push the username to the array of users who liked the resource

    // Seeing if anything was found AND modified
    console.log("Number of documents matched: " + result.n);
    console.log("Number of documents modified: " + result.nModified);
    console.log(
      "-------------------------------------------------------------------"
    );

    // If a resource's likes was modified/incremented, that means the user never liked it before
    if (result.nModified > 0) {
      // Send to the frontend that the user never liked it before
      return res.status(200).send({ likedBefore: false });
    }

    // If a song's likeCount was not modified/incremented, that means the user liked it before and should not spam
    else {
      return res.status(200).send({ likedBefore: true });
    }
  }
);

// @route    POST api/upload/resource/unlikeResource/:discipline/:id/:username
// @desc     Decrement the like count of a resource on the backend (sent from ResourcePage.js)
// @access   Private
router.post(
  "/resource/unlikeResource/:discipline/:id/:username",
  auth,
  async (req, res) => {
    const { discipline, id, username } = req.params;

    // Determine which domain this resource belongs to
    // This will determine which collection to add our resource in
    let whichDomain = "";
    switch (discipline) {
      case "languages":
        whichDomain = Language;
        break;
      case "mathematics":
        whichDomain = Mathematics;
        break;
      case "databases":
        whichDomain = Database;
        break;
      case "architecture":
        whichDomain = Architecture;
        break;
      case "algorithms-and-data-structures":
        whichDomain = Algorithm;
        break;
      case "artificial-intelligence":
        whichDomain = Ai;
        break;
      default:
    }
    // console.log("Resource domain: ", whichDomain);

    // updateOne first parameter is document we want to find, second parameter is the changes we want to make
    console.log(req.params.username);
    const result = await whichDomain.updateOne(
      // Query the resource by utilizing the id as an identifier and making sure the user is in likedBy
      { _id: id, likedBy: username },
      // pull a username out of the likedBy array and decrement the likes by -1
      { $pull: { likedBy: username }, $inc: { likes: -1 } }
    );

    // If a resource's likes was modified/decremented, that means the user liked it before
    if (result.nModified > 0) {
      return res.status(200).send({ ableToDislike: true });
    }

    // If a resource's likes was not modified/decremented, that means the user never liked it in the first place
    else {
      return res.status(200).send({ ableToDislike: false });
    }
  }
);

// @route    POST api/upload/resource/addToProfile/:discipline/:id/:username
// @desc     Decrement the like count of a resource on the backend (sent from ResourcePage.js)
// @access   Private
router.post(
  "/resource/addToProfile/:discipline/:id/:username",
  auth,
  async (req, res) => {
    const { discipline, id, username } = req.params;

    // Determine which domain this resource belongs to
    // This will determine which collection to add our resource in
    let whichDomain = "";
    switch (discipline) {
      case "languages":
        whichDomain = Language;
        break;
      case "mathematics":
        whichDomain = Mathematics;
        break;
      case "databases":
        whichDomain = Database;
        break;
      case "architecture":
        whichDomain = Architecture;
        break;
      case "algorithms-and-data-structures":
        whichDomain = Algorithm;
        break;
      case "artificial-intelligence":
        whichDomain = Ai;
        break;
      default:
    }

    let savedResource = await whichDomain.findOne({ _id: id });

    let result = await User.findOneAndUpdate(
      { username: username, likedResources: { $ne: savedResource } },
      { $push: { likedResources: savedResource } },
      { useFindAndModify: false }
    );
    console.log(result);
    return res.status(200).json({ data: "Added to your repository" });
  }
);


// @route    POST api/upload/thread
// @desc     Push a new thread to thread collection (thread sent from threadCreation.js)
// @access   Private
router.post("/thread", auth, async (req, res) => {

 let repositoryTitle = req.body.repository;
 let threadTitle= req.body.threadTitle;
 let difficultyLevel = req.body.difficultyLevel;
 let submittedBy = req.body.submittedBy;

let threadLevelArr = "";
// Determine which array this thread belongs to
switch(difficultyLevel) {
  case "Beginner":
    threadLevelArr = "beginnerThreads";
    break;
  case "Intermediate":
    threadLevelArr = "intermediateThreads";
    break;
  case "Advanced":
    threadLevelArr = "advancedThreads"; 
    break;
  default:
}
//  console.log("thread level array: ", threadLevelArr);
  
    // add the thread to MongoDB
    const result = await Thread.findOneAndUpdate(
      {repository: repositoryTitle},
      {$push:{beginnerThreads: [threadTitle]}},
      { useFindAndModify: false }
    );
    console.log(result);
  
    // // Credit the user who added the new thread
    const creditUser = await User.findOneAndUpdate(
      { username: submittedBy },
      { $push: { openThreads: threadTitle} },
      { useFindAndModify: false }
    );
    console.log(creditUser);
  
  // Send a success response to the frontend
  return res.json({ response: "From backend to frontend" });
});
module.exports = router;
