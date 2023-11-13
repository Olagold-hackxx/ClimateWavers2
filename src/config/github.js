const github = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");

github.serializeUser(function (user, done) {
  done(null, user.id);
});

github.deserializeUser(function (user, done) {
  const currentUser = User.findOne({
    where: {
      id: user.id,
    },
  });
  done(null, currentUser);
});

github.use(
  new GitHubStrategy(
    {
      clientID: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile._json.email) {
         profile._json.email = profile._json.name.split(" ")[0]
        }
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: profile._json.email,
          },
        });
        if (userExists) {
          await userExists.update({ isGithubUser: true });
          await userExists.save();
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          existingToken = await Token.update(
            { refreshToken: accessToken },
            {
              where: {
                UserId: userExists.id,
              },
            }
          );
          return done(null, userDetails);
        }

        // save user to db and return access token if user does not exist
        const user = await User.create({
          email: profile._json.email,
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1],
          isVerified: true,
          username: profile._json.name.split(" ")[0],
          isGithubUser: true,
          password: undefined,
          profilePic: profile._json.avatar_url,
          cover: profile._json.avatar_url,
        });
        const userDetails = {
          id: user.id,
          email: user.email,
          accessToken,
        };
        await Token.create({
          refreshToken: accessToken,
          UserId: user.id,
        });
        console.log("Autenticated successfully");
        return done(null, userDetails);
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    }
  )
);

module.exports = github;
