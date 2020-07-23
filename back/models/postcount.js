module.exports = (sequelize, DataTypes) => {
  const PostCount = sequelize.define("PostCount", {
    hit: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  });
  PostCount.associate = (db) => {
    db.PostCount.belongsTo(db.Post);
  };
  return PostCount;
};
