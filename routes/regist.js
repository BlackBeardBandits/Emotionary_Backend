// const crypto = require("crypto");
const express = require("express");
const { User } = require("../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const user = new User(req.body);

  //   let inputPassword = user.password;

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// router.get("/", (req, res, next) => {
//   const email = req.query;
// });

module.exports = router;
