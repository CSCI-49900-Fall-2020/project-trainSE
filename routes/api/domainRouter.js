const router = require("express").Router();
const auth = require("../../middleware/auth");
const Domain = require("../../models/DomainModel");
const fetchThreads = require("../../middleware/determineRepo");

router.get("/domainFields", auth, async (req, res) => {
  const domainData = await Domain.find();
  return res.json({ domains: domainData });
});

router.get("/fetchThreads/:discipline/:repository", auth, async (req, res) => {
  const { discipline, repository } = req.params;
  const answer = fetchThreads(discipline, repository);
  console.log("From router: " + answer);

  return res.json({ response: "hello" });
});

module.exports = router;
