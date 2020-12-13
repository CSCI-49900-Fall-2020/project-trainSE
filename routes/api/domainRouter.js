const router = require("express").Router();
const auth = require("../../middleware/auth");
const Domain = require("../../models/DomainModel");
const Thread = require("../../models/ThreadModel");
const fetchThreads = require("../../middleware/determineRepo");
const fetchResources = require("../../middleware/determineResources");
const fetchOneResource = require("../../middleware/determineResource");

// @route    GET api/domain/domainFields
// @desc     Retrieve domain and repository names (mostly for Dashboard.js)
// @access   Private
router.get("/domainFields", auth, async (req, res) => {
  const domainData = await Domain.find();
  return res.json({ domains: domainData });
});

// @route    GET api/domain/fetchThreads/:discipline/:repository
// @desc     Retrieve the threads for a specific discipline and repository (mostly for Repository.js)
// @access   Private
router.get("/fetchThreads/:discipline/:repository", auth, async (req, res) => {
  const { discipline, repository } = req.params;
  // console.log("fetch threads: ", repository);
  // Call custom middleware
  const threads = await fetchThreads(discipline, repository);
  //   const beginnerThreads = threads[0].beginnerThreads;
  //   const intermediateThreads = threads[0].intermediateThreads;
  //   const advancedThreads = threads[0].advancedThreads;

  //   return res.json({ beginnerThreads, intermediateThreads, advancedThreads });
  return res.json({ threads: threads });
});

// @route    GET api/domain/fetchResources/:discipline/:repository/:threads
// @desc     Retrieve the resources for a specififc thread (mostly for ThreadPage.js)
// @access   Private
router.get(
  "/fetchResources/:discipline/:repository/:threads",
  auth,
  async (req, res) => {
    const { discipline, repository, threads } = req.params;
    // Call custom middleware
    const resources = await fetchResources(discipline, repository, threads);

    return res.json({ resources: resources });
  }
);

// @route    GET api/domain/fetchOneResource/:discipline/:repository/:threads/:id
// @desc     Retrieve a resource based on the thread and id (mostly for ResourcePage.js)
// @access   Private
router.get(
  "/fetchOneResource/:discipline/:repository/:threads/:id",
  auth,
  async (req, res) => {
    const { discipline, repository, threads, id } = req.params;
    // console.log(id);
    // Call custom middleware
    const resource = await fetchOneResource(discipline, id);

    return res.json({ resource: resource });
  }
);

// @route    GET api/domain/fetchDropdownRepos/:discipline
// @desc     Retrieve the repos for a given discipline (mostly for ResourceCreation.js dropdown)
// @access   Private
router.get("/fetchDropdownRepos/:discipline", auth, async (req, res) => {
  const { discipline } = req.params;

  const domainData = await Domain.findOne({ discipline: discipline });
  // console.log(domainData);
  const options = [];
  let rep;

  for (repo of domainData.repositories) {
    let optionObject = {
      key: repo.repoLink,
      text: repo.repository,
      value: repo.repository,
    };
    options.push(optionObject);
  }

  // console.log(options);
  return res.json({ repos: options });
});

// @route    GET api/domain/fetchDropdownRepos/:repository
// @desc     Retrieve the repos for a given discipline (mostly for ResourceCreation.js dropdown)
// @access   Private
router.get("/fetchDropdownThreads/:repository", auth, async (req, res) => {
  const { repository } = req.params;
  // console.log(repository);
  const threads = await Thread.findOne({ repository: repository });
  console.log("This is the threads: ", threads);
  const beginnerOptions = [];
  const intermediateOptions = [];
  const advancedOptions = [];
  let thread;

  for (thread of threads.beginnerThreads) {
    let optionObject = {
      key: thread,
      text: thread,
      value: thread,
      difficulty: "Beginner",
    };
    beginnerOptions.push(optionObject);
  }

  for (thread of threads.intermediateThreads) {
    let optionObject = {
      key: thread,
      text: thread,
      value: thread,
      difficulty: "Intermediate",
    };
    intermediateOptions.push(optionObject);
  }

  for (thread of threads.advancedThreads) {
    let optionObject = {
      key: thread,
      text: thread,
      value: thread,
      difficulty: "Advanced",
    };
    advancedOptions.push(optionObject);
  }
  console.log("Beginner: :", beginnerOptions);
  console.log("Intermediate: :", intermediateOptions);
  console.log("Advanced: :", advancedOptions);
  return res.json({ beginnerOptions, intermediateOptions, advancedOptions });
});

module.exports = router;
