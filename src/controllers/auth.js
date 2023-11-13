const Token = require("../models/Token");
const User = require("../models/User");
const axios = require("axios");
const {
  isTokenValid,
  attachCookiesToResponse,
} = require("../utils/jwt");
const TokenError = require("../errors/tokenError");

const oauthSignIn = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    // check for existing refresh token
    const existingToken = await Token.findOne({ where: { UserId: user.id } });

    if (existingToken === null || existingToken.refreshToken === null) {
      // Set Google oauth option to resend refresh token
      const error = new TokenError(
        "Session expired, Please reauthenticate your account"
      );
      return res.status(400).json({ error: error.message });
    }
    refreshToken = existingToken.refreshToken;
    user.refreshToken = refreshToken;
    attachCookiesToResponse({ res, user: user, refreshToken });
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(403).send(err);
  }
};

const redhatSS0 = async (req, res) => {
  try {
    const token = JSON.parse(req.session["keycloak-token"]);
    console.log(token.access_token);
    const user = isTokenValid(token.access_token);
    console.log(user);
    // check for existing token
    const existingUser = await User.findOne({ where: { email: user.email } });
    const existingToken = await Token.findOne({
      where: { userId: existingUser.id },
    });

    if (!existingToken) {
      return res.status(201).json({ accessToken: token, user });
    }
    refreshToken = token.refresh_token;
    attachCookiesToResponse({ res, user: user, refreshToken });
    return res.status(201).json({ accessToken: token, user });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const linkedInOauth = async (req, res, next) => {
  try {
    console.log(req.query.id);
    //here we get this code from passport linkedin strategy.
    const code = req.query.code;

    const redirectUri = `${process.env.BASE_URL}/api/v1/auth/linkedin/callback`;
    let accessToken;
	let userInfo
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    //step 2 : access token retrieval
    const accessTokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;
    await axios
      .post(accessTokenUrl)
      .then((res) => {
        accessToken = res.data.access_token;
      })
      .catch((err) => {
        console.log(err);
      });
    //Fetching User Data
    const userInfoUrl = `https://api.linkedin.com/v2/userinfo`;
    if (accessToken) {
      await axios
        .get(userInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          userInfo = response.data;
          // res.send(res.data);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    } else {
      console.log("access token not found");
	  return res.status(400).json({ error: "access token not found"})
    }
    if (userInfo) {
      if (!userInfo.email) {
        const emailNotFound = {
          message:
            "Please add a public email to your LinkedIn account to sign in in with LinkedIn",
        };
        req.flash("error", emailNotFound);
        return redirect(`${process.env.BASE_URL}/error`);
      }
      // return access token if user already exists
      const userExists = await User.findOne({
        where: {
          email: userInfo.email,
        },
      });
      if (userExists) {
		await userExists.update({isLinkedinUser: true,})
		await userExists.save()
        // generate an jwt token for user
        const userDetails = {
          id: userExists.id,
          email: userExists.email,
          accessToken,
        };
        if (accessToken) {
          existingToken = await Token.findOne({
            where: { UserId: userExists.id },
          });
          existingToken.update({
            refreshToken: accessToken,
          });
          existingToken.save();
        }
        req.user = userDetails;
        return next();
      }
      console.log(userInfo);
      // save user to db and return access token if user does not exist
      const user = await User.create({
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        isVerified: true,
        username: userInfo.given_name,
        profilePic: userInfo.picture,
        cover: userInfo.picture,
        isLinkedinUser: true,
        password: undefined,
      });

      await Token.create({
        refreshToken: accessToken,
        UserId: user.id,
      });
	  req.user = user;
	  return next();
    }
	return res.status(400).json({ error: "User not found"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  oauthSignIn,
  linkedInOauth,
  redhatSS0,
};
