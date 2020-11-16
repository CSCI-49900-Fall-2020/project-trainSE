const router = require("express").Router();
const auth = require("../../middleware/auth");
const Domain = require("../../models/DomainModel");
const fetchThreads = require("../../middleware/determineRepo");
const fetchResources = require("../../middleware/determineResources");
const fetchOneResource = require("../../middleware/determineResource");

router.get("/domainFields", auth, async (req, res) => {
  const domainData = await Domain.find();
  return res.json({ domains: domainData });
});

router.get("/fetchThreads/:discipline/:repository", auth, async (req, res) => {
  const { discipline, repository } = req.params;
  // console.log("fetch threads: ", repository);
  const threads = await fetchThreads(discipline, repository);
  //   const beginnerThreads = threads[0].beginnerThreads;
  //   const intermediateThreads = threads[0].intermediateThreads;
  //   const advancedThreads = threads[0].advancedThreads;

  //   return res.json({ beginnerThreads, intermediateThreads, advancedThreads });
  return res.json({ threads: threads });
});

router.get(
  "/fetchResources/:discipline/:repository/:threads",
  auth,
  async (req, res) => {
    const { discipline, repository, threads } = req.params;
    const resources = await fetchResources(discipline, repository, threads);

    return res.json({ resources: resources });
  }
);

router.get(
  "/fetchOneResource/:discipline/:repository/:threads/:id",
  auth,
  async (req, res) => {
    const { discipline, repository, threads, id } = req.params;
    console.log(id);
    const resource = await fetchOneResource(discipline, id);

    return res.json({ resource: resource });
  }
);

module.exports = router;
