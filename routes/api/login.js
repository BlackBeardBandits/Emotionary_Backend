const express = require("express");
const { User } = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// @route  POST api/login
// @desc   login
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "해당 이메일이 없습니다." });

    // password를 암호화 하기
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(hashedPassword);
    // console.log(user.password);

    if (password === user.password) {
      console.log(password);
      console.log(user.password);
      return res.status(200).json({ success: true, id: user._id });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
