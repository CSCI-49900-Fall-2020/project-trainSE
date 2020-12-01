const User = require("../models/UserModel");
const Algorithm = require("../models/AlgorithmsModel");
const Architecture = require("../models/ArchitectureModel");
const Database = require("../models/DatabaseModel");
const Language = require("../models/LanguageModel");
const Mathematics = require("../models/MathematicsModel");
const Ai = require("../models/AIModel");
const Thread = require("../models/ThreadModel");

const fetchThreads = async (discipline, repository) => {
  const repoThreads = await Thread.find({ repositoryLink: repository });

  return repoThreads;
};

module.exports = fetchThreads;
