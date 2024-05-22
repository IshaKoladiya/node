const passport = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const person = require("./models/person");


passport.use(new LocalStrategy(async (username, password, done) => {
  
    try {
      console.log(username,password)
      const user = await person.findOne({username});
      if (!user) {
        return done(null, false, { message: "invalid username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;