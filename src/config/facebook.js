const facebook = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../models/User");
const Token = require("../models/Token");

facebook.serializeUser(function (user, done) {
	done(null, user.id);
  });

  facebook.deserializeUser(function (user, done) {
	const currentUser = User.findOne({
	  where: {
		id: user.id,
	  },
	});
	done(null, currentUser);
  });

facebook.use(
  new FacebookStrategy(
    {
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		callbackURL: `${process.env.BASE_URL}/api/v1/auth/facebook/callback`,
		profileFields: ['id', 'displayName', 'name', 'photos', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
		console.log()
		console.log(refreshToken)
		console.log(accessToken)
		try {
		   // save user to db and return access token if user does not exist
		   if (!profile._json.email) {
			profile._json.email = profile.name.givenName
		  }
		  // return access token if user already exists
		  const userExists = await User.findOne({where: {
			email: profile._json.email,
		  }});
		  if (userExists) {
			// generate an jwt token for user
			const userDetails = {
			  id: userExists.id,
			  email: userExists.email,
			  accessToken,
			};
			await userExists.update({isFacebookUser: true,})
			await userExists.save()
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
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			isVerified: true,
			username: profile.name.givenName,
			isFacebookUser: true,
			password: undefined,
			profilePic: profile.photos[0].value,
			cover: profile._json.picture.data.url,
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

module.exports = facebook;
