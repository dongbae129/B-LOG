module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4", //  한글+이모티콘
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Hashtag);
    db.Post.hasOne(db.PostCount);
  };
  return Post;
};
