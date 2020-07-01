const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressSession = require("express-session");
const db = require("./models");

const app = express();
db.sequelize.sync();
dotenv.config();

app.use(morgan("dev"));
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.listen("8020", () => {
  console.log(
    "************************************************\n          express running on port 6000\n************************************************"
  );
});
