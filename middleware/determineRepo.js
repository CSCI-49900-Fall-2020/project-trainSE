const User = require("../models/UserModel");
const Algorithm = require("../models/AlgorithmsModel");
const Architecture = require("../models/ArchitectureModel");
const Database = require("../models/DatabaseModel");
const Language = require("../models/LanguageModel");
const Mathematics = require("../models/MathematicsModel");

const fetchThreads = async (discipline, repository) => {
  switch (discipline) {
    case "languages":
      await Language.find({ repositoryLink: repository });
    case "architecture":
      await Architecture.find();
  }

  console.log(discipline, repository);
  return "hello";
};

module.exports = fetchThreads;
