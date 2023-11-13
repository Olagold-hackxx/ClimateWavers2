const google = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");

google.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // return access token if user already exists
        const userExists = await User.findOne({where: {
          email: profile._json.email,
        }});
        if (userExists) {
		  await userExists.update({isGoogleUser: true,})
		  await userExists.save()
          // generate an jwt token for user
		  const userDetails = {id: userExists.id, email: userExists.email, accessToken};
          if (refreshToken) {
			await Token.findOrCreate({ defaults: { UserId: userExists.id }, where: {
				refreshToken: refreshToken
			}
			  })

		}
          return done(null, userDetails);
        }
		console.log(profile._json)
        // save user to db and return access token if user does not exist
        const user = await User.create({
          email: profile._json.email,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          isVerified: profile._json.email_verified,
          username: profile._json.given_name,
          isGoogleUser: true,
		  password: undefined,
		  profilePic: profile._json.picture,
		  cover: profile._json.picture
        });
		console.log(user)
        const userDetails = {id: user.id, email: user.email, accessToken}
		await Token.create({
			refreshToken: refreshToken,
			UserId: user.id,
		  })
		  .catch(err => {
			console.log(err.message)
		  })
        return done(null, userDetails);
      } catch (err) {
		console.log(err)
        return done(err, false);
      }
    }
  )
);
module.exports = google;