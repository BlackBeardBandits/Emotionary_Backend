const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1, // 이메일은 고유해야 함
  },
  password: {
    type: String,
    minlength: 8,
  },
  role: {
    type: Number, // 1: admin, 0: user
    default: 0,
  },
  image: String,
  token: {
    // 유효성 관리를 위해 토큰을 사용
    type: String,
  },
  tokenExp: {
    // 토큰이 사용될 수 있는 기간
    type: Number,
  },
});

userSchema.methods.comparePassword = async function (plainPassword) {
  //plainPassword를 암호화해서 현재 비밀번호화 비교
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
