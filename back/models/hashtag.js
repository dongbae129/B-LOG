module.exports = (sequelzie, DataTypes) => {
  const Hashtag = sequelzie.define(
    "Hashtag",
    {
      hashtag: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsTo(db.Post);
  };
  return Hashtag;
};
