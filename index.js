const express = require("express"); // express 모듈을 가져오는 것
const app = express(); // 가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const port = 4000; // 4000 이라는 port를 사용하겠다!
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require("./config/key");
const { User } = require("./models/User");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connect..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // express 앱(app)을 넣고, root directory에 오면, "Hello World!" 를 출력되게 해준다.
  res.send("Hello World!!!");
});

app.post("/register", (req, res) => {
  // 여기서 작성해줘야 할 코드는 ..
  // client에서 보내주는 username, email, password 등 회원가입때 필요한 정보들을 client에서 가져오면,
  // 정보들을 데이터 베이스에 넣어주는 것을 작업을 야기서 해주는거다! ✨
  // 위 작업을 해주기 위해, usermodel을 가져와야한다. <-- models 폴더안에 들어있는 User.js

  const user = new User(req.body);

  user.save((err, userInfo) => {
    // 만약 저장할 때 에러가 있다면 클라이언트에게 에러가 있다고 전하는데 이를 JSON 타입으로 보내주는 것
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      // 성공했다면 200 코드와 함께 성공했다는 것을 JSON 타입으로 보내준다.
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
