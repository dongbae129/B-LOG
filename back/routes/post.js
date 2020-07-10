const express = require("express");
const db = require("../models");
const router = express.Router();

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
const upload = multer({ storage: storage, fileSize: 20 * 1024 * 1024 });

router.post("/", isLoggedIn, upload.none(), async (req, res) => {
  try {
    const newPost = await db.Post.create({
      title: req.body.title,
      description: req.body.description,
      UserId: req.user.id,
    });
    if (req.body.image_src_arr.length !== 0) {
      await Promise.all(
        req.body.image_src_arr.map((v) =>
          db.Image.create({
            src: v,
            PostId: newPost.id,
          })
        )
      );
      if (req.body.hashtag.length !== 0) {
        await Promise.all(
          req.body.hashtag.map((v) =>
            db.Hashtag.create({
              hashtag: v,
              PostId: newPost.id,
            })
          )
        );
      }
    }

    const fullPost = await db.Post.findOne({
      where: newPost.id,
      include: [
        {
          model: db.User,
          attributes: ["userId", "nickname"],
        },
        {
          model: db.Image,
          attributes: ["src"],
        },
        {
          model: db.Hashtag,
          attributes: ["hashtag"],
        },
      ],
    });

    res.json(fullPost);
  } catch (e) {
    console.error(e);
  }
});

router.post("/image", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.send("sussusu");
});
module.exports = router;
