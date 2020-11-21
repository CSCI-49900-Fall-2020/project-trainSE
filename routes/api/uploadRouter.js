const router = require("express").Router();
const auth = require("../../middleware/auth");
const {
  lowercaseDashify,
  getTimeStamp,
} = require("../../middleware/helperFunctions");
const Algorithm = require("../../models/AlgorithmsModel");
const Architecture = require("../../models/ArchitectureModel");
const Database = require("../../models/DatabaseModel");
const Language = require("../../models/LanguageModel");
const Mathematics = require("../../models/MathematicsModel");

// @route    POST api/upload/resource
// @desc     Upload a resource to MongoDB (resource sent from ResouceCreation.js)
// @access   Private
router.post("/resource", auth, async (req, res) => {
  // When submitting a resource
  // const algorithmSchema = new Schema({
  //     resourceTitle: String,
  //     resourceLink: String,
  //     resourceType: String,
  //     threadTitle: String,
  //     threadLink: String,
  //     repository: String,
  //     repositoryLink: String,
  //     difficultyLevel: String,
  //     disciplineTitle: String,
  //     disciplineLink: String,
  //     rating: Number,
  //     likes: Number,
  //     comments: [],
  //     searchTerm: String,
  //   });
  // Destructure the form submitted data from req.body
  let {
    resourceTitle,
    resourceLink,
    resourceType,
    threadTitle,
    repository,
    difficultyLevel,
    disciplineTitle,
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
    comments: [],
    searchTerm: "",
  });

  console.log(newResource);
  //   const savedResource = await newResource.save();
  //   console.log(savedResource);

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

module.exports = router;
