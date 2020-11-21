const router = require("express").Router();
const auth = require("../../middleware/auth");
const Domain = require("../../models/DomainModel");
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

module.exports = router;
