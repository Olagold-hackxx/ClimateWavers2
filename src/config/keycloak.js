const { Strategy } = require("openid-client");
const keycloak = require("passport");
const User = require("../models/User");
const Token = require("../models/Token");

// keycloak initiation
async function keycloakStrategy(client) {
  keycloak.use(
    "oidc",
    new Strategy({ client }, async (tokenSet, userinfo, done) => {
	  const accessToken = tokenSet.access_token;
	  const refreshToken = tokenSet.refresh_token
	  try {
        if (!userinfo.email) {
          const emailNotFound = {
            message:
              "Please add a public email to your climatewavers sso account to sign in in with github",
          };
          return done(null, false, emailNotFound);
        }
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: userinfo.email,
          },
        });
        if (userExists) {
          await userExists.update({ isRedhatUser: true });
          await userExists.save();
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          existingToken = await Token.update(
            { refreshToken: refreshToken },
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
          email: userinfo.email,
          firstName: userinfo.given_name,
          lastName: userinfo.family_name,
          isVerified: userinfo.email_verified,
          username: userinfo.preferred_username,
          isGithubUser: true,
          password: undefined,
        });
        const userDetails = {
          id: user.id,
          email: user.email,
          accessToken,
        };
        await Token.create({
          refreshToken: refreshToken,
          UserId: user.id,
        });
        console.log("Autenticated successfully");
        return done(null, userDetails);
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    })
  );

  keycloak.serializeUser(function (user, done) {
    done(null, user);
  });
  keycloak.deserializeUser(function (user, done) {
    done(null, user);
  });
  return keycloak;
}

module.exports = keycloakStrategy;
