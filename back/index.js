const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
const userAPI = require("./routes/user");
const postAPI = require("./routes/post");

db.sequelize.sync();
dotenv.config();
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "B-log_react",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userAPI);
app.use("/api/post", postAPI);

app.listen("8020", () => {
  console.log(
    "************************************************\n          express running on port 8020\n************************************************"
  );
});
