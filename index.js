//index.js
const express = require("express"); // express 모듈을 가져오는 것
const app = express(); // 가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const port = 4000; // 4000 이라는 port를 사용하겠다!

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jeonbyeongmin:emoemo@emotionary.3gbbt.mongodb.net/Emotionary?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connect..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  //express 앱(app)을 넣고, root directory에 오면,
  res.send("Hello World!"); //"Hello World!" 를 출력되게 해준다.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); //포트 5000번에서 이 앱을 실행한다.
