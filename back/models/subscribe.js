module.exports = (sequelize, DataTypes) => {
  const Subscribe = sequelize.define(
    "Subscribe",
    {
      fromUserNickname: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      fromUserId: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      toUserId: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      toUserNickname: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  // Subscribe.associate = (db) => {
  //   db.Subscribe.belongsTo(db.User);
  // };
  return Subscribe;
};
