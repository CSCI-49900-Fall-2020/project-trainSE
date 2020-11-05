const router = require("express").Router();
const auth = require("../../middleware/auth");
const Domain = require("../../models/DomainModel");

router.get("/domainFields", auth, async (req, res) => {
  const domainData = await Domain.find();
  return res.json({ domains: domainData });
});

module.exports = router;
