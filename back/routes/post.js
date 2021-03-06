const express = require("express");
const db = require("../models");
const router = express.Router();

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
const upload = multer({ storage: storage, fileSize: 20 * 1024 * 1024 });

router.get("/", async (req, res) => {
  try {
    console.log(req.query.lastId, req.query.limit, "&&");
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [Op.lt]: parseInt(req.query.lastId, 10), // less than
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["nickname", "userId", "id"],
        },
        {
          model: db.Image,
          attributes: ["src"],
        },
        {
          model: db.Hashtag,
          attributes: ["hashtag"],
        },
        {
          model: db.PostCount,
        },
      ],
      limit: parseInt(req.query.limit, 10),
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
  }
});
router.get("/:userId/:postId", async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: {
        [Op.and]: [
          { UserId: parseInt(req.params.userId, 10) },
          { id: parseInt(req.params.postId, 10) },
        ],
      },
      include: [
        {
          model: db.User,
          attributes: ["nickname", "userId"],
        },
        {
          model: db.PostCount,
          attributes: ["hit"],
        },
        {
          model: db.Hashtag,
          attributes: ["hashtag"],
        },
      ],
    });
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});
router.get("/:userId", async (req, res) => {
  try {
    console.log(req.query.count, "%%%%%%%%%%%%%%%%%%%");
    const user = await db.User.findOne({
      where: { userId: req.params.userId },
      attributes: ["id", "userId", "nickname"],
    });
    const id = user.toJSON().id;
    const posts = await db.Post.findAll({
      where: { UserId: id },
      include: [
        {
          model: db.Image,
          attributes: ["src"],
        },
        {
          model: db.User,
          attributes: ["userId"],
        },
        {
          model: db.Hashtag,
          attributes: ["hashtag"],
        },
        {
          model: db.PostCount,
        },
      ],
      offset: parseInt(req.query.count, 10),
      limit: parseInt(req.query.limit, 10),
    });
    const countPost = await db.Post.findAll({
      where: { UserId: id },
      include: [
        {
          model: db.PostCount,
          attributes: ["hit"],
        },
      ],
      attributes: ["id", "description"],
      order: [[{ model: db.PostCount }, "hit", "DESC"]],
      limit: 3,
    });
    // console.log(JSON.stringify(countPost), "&*&*&*&*&*&*");
    const count = await db.Post.count({
      where: { UserId: id },
    });

    const fullPosts = Object.assign(
      {},
      { posts, user, countPost, pageCount: count }
    );

    // const count = await db.Post.count({
    //   where: { UserId: id },
    // });

    res.json(fullPosts);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", isLoggedIn, upload.none(), async (req, res) => {
  try {
    const newPost = await db.Post.create({
      title: req.body.title,
      description: req.body.description,
      UserId: req.user.id,
    });
    await db.PostCount.create({
      hit: 0,
      PostId: newPost.id,
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
    } else {
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
        {
          model: db.PostCount,
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

router.post("/count/:postId", async (req, res) => {
  try {
    await db.PostCount.increment(
      { hit: 1 },
      { where: { PostId: req.params.postId } }
    );
    res.send("success");
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
