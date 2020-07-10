const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const { isLoggedIn } = require("./middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, basename + new Date().valueOf() + ext);
  },
});
const upload = multer({ storage: storage });

router.post("/uploads", upload.array("image"), (req, res) => {
  console.log(req.files, "1");
  console.log(req.body, "2");
  res.json(req.files.map((file) => file.filename));
});
router.get("/", isLoggedIn, (req, res) => {
  try {
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
  } catch (e) {
    console.error(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const duplicate_user = await db.User.findOne({
      where: { userId: req.body.id },
    });
    if (duplicate_user) {
      console.log(duplicate_user, "###");
      return res.status(400).send("중복된 아이디");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await db.User.create({
      userId: req.body.id,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
    const deleted_passw_user = Object.assign({}, user.toJSON());
    delete deleted_passw_user.password;
    console.log(deleted_passw_user);
    return res.json(deleted_passw_user);
  } catch (e) {
    console.error(e);
    next();
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      const filteredUser = Object.assign({}, user.toJSON());
      delete filteredUser.password;
      return res.json(filteredUser);
    });
  })(req, res, next);
});

module.exports = router;
