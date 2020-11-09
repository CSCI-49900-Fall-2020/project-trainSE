const User = require("../models/UserModel");
const Algorithm = require("../models/AlgorithmsModel");
const Architecture = require("../models/ArchitectureModel");
const Database = require("../models/DatabaseModel");
const Language = require("../models/LanguageModel");
const Mathematics = require("../models/MathematicsModel");

const fetchResources = async (discipline, repository, thread) => {
  console.log(discipline, repository, thread);
  // const repoThreads = await Thread.find({ repositoryLink: repository });
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
    default:
  }
  console.log(whichDomain);
  let resources = await whichDomain.find({
    threadLink: thread,
    repositoryLink: repository,
  });

  console.log(resources);

  return resources;
};

module.exports = fetchResources;
