const express = require("express");
const { User } = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// @route  POST api/register
// @desc   Register user
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // email check
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    const user = new User(req.body);

    console.log(user);

    // password를 암호화 하기
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    // Save data in mongoDB
    await user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
