const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { createJWT } = require("../utils/jwt");
const User = require("../models/User");
const Token = require("../models/Token");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // return access token if user already exists
        const userExists = await User.findOne({
          email: profile._json.email,
        });
        if (userExists) {
          // generate an jwt token for user
		  const payload = {_id: userExists._id, email: userExists.email};
          const token = createJWT(payload);

          if (refreshToken) {
			  existToken = await Token.findOne({where: { user: userExists._id }})
              existToken.update({
                refreshToken,
              });
			  existToken.save()
          }
          return done(null, token);
        }

        // save user to db and return access token if user does not exist
        const user = await User.create({
          email: profile._json.email,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          isVerified: true,
          username: profile._json.given_name,
          isGoogleUser: true,
		  password: undefined,
        });

        const token = createJWT({_id: user._id, email: user.email});
		await Token.create({
			refreshToken,
			userId: user._id,
		  });
        return done(null, token);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
module.exports = passport;