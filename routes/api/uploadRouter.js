const router = require("express").Router();
const auth = require("../../middleware/auth");
const { lowercaseDashify } = require("../../middleware/helperFunctions");
const Algorithm = require("../../models/AlgorithmsModel");
const Architecture = require("../../models/ArchitectureModel");
const Database = require("../../models/DatabaseModel");
const Language = require("../../models/LanguageModel");
const Mathematics = require("../../models/MathematicsModel");

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
  let {
    resourceTitle,
    resourceLink,
    resourceType,
    threadTitle,
    repository,
    difficultyLevel,
    disciplineTitle,
  } = req.body;
  const threadLink = lowercaseDashify(threadTitle);
  const repositoryLink = lowercaseDashify(repository);
  const disciplineLink = lowercaseDashify(disciplineTitle);

  console.log(threadLink, repositoryLink, disciplineLink);

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

  return res.json({ response: "From backend to frontend" });
});
/***************Comment form route ********************/
router.post("/resource/comment/:discipline/:id", auth, async (req, res) => {

  // helper function that obtains comment data and time as a strinh
  function getTimeStamp() {
    const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    const d = new Date();
    const currDate = d.getDate();
    const currMonthNum = d.getMonth();
    const currYear = d.getFullYear();
    const currTime = d.toLocaleString("en-US", {
       hour: "numeric",
       minute: "numeric",
       hour12: true
       });
    const dateString = monthArr[currMonthNum] +" " +currDate +", " + currYear +" at " + currTime;
    return dateString;
  }
  
  const newComment = {
    author: req.body.author,
    text: req.body.text,
    timeStamp: getTimeStamp()
  }
// finds the domain
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
  console.log("Resource domain: ", whichDomain);
  // push flag allows to add the object to the array of comments 
  const result = await whichDomain.findByIdAndUpdate({ _id: req.params.id },{ $push: { comments: [newComment] }}, {useFindAndModify: false});
 console.log("this is the result from backend:  ");
  console.log(result);


  return res.json({respose:"From backend to frontend"});
});

module.exports = router;
