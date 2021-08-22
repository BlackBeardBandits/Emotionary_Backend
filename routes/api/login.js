const express = require("express");
const { User } = require("../../models/User");
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

    user
      .comparePassword(password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({
            Success: false,
            message: "비밀번호가 일치하지 않습니다.",
          });
        }
        return res.status(200).json({
          success: true,
        });
      })
      .catch((err) => res.status(500).json({ success: false, err }));
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
