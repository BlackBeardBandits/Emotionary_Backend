const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/a", (req, res, next) => {
  res.render("index", { title: "a" });
});

module.exports = router;
