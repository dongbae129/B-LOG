const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userId: id },
          });
          if (!user)
            return done(null, false, { reason: "존재하지 않는 사용자 입니다" });
          const result = await bcrypt.compare(password, user.password); //password는 front에서 보낸거, user.password는 db에 있는 비번
          if (result) return done(null, user);
          return done(null, false, { reason: "비밀번호가 틀립니다" });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
