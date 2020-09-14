const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
  res.json(req.files.map((file) => file.filename));
});
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const subscribe = await db.Subscribe.findAll({
      where: {
        [Op.and]: [{ toUserId: req.user.userId }, { checked: false }],
      },
    });

    const user = { subscribe, ...req.user.toJSON() };
    // const user = Object.assign({}, req.user.toJSON());
    // delete user.password;
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
    return req.login(user, async (loginErr) => {
      if (loginErr) return next(loginErr);
      // const filteredUser = Object.assign({}, user.toJSON());
      // delete filteredUser.password;
      const subscribe = await db.Subscribe.findAll({
        where: {
          [Op.and]: [{ UserId: req.user.userId }, { checked: false }],
        },
      });
      // const fullUser = { subscribe, ...user.toJSON() };
      return res.json(user);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("success logout");
});

router.post("/subscribe", isLoggedIn, async (req, res) => {
  try {
    const subscribe = await db.Subscribe.create({
      UserId: req.user.id,
      userNickname: req.user.nickname,
      toUserId: req.query.id,
      checked: false,
    });
    res.json(subscribe);
  } catch (e) {
    console.error(e);
  }
});

router.post("/acceptSubscribe", isLoggedIn, async (req, res) => {
  try {
    const acceptSubs = await db.Subscribe.update(
      { checked: true },
      {
        where: {
          [Op.and]: [{ toUserId: req.user.userId }, { UserId: req.query.id }],
        },
      }
    );
    res.json(acceptSubs);
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
