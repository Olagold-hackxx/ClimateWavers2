const express = require("express");
const { oauthSignIn, linkedInOauth } = require("../controllers/auth");
const keycloak = require("../config/keycloak");
const google = require("../config/google");
const linkedin = require("../config/linkedin");
const facebook = require("../config/facebook");
const github = require("../config/github");
const authRouter = express.Router();
const session = require("express-session");
const memoryStore = new session.MemoryStore();
const { Issuer } = require("openid-client");

const currentSession = session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
});

// keycloak initiation
async function initializeOIDC() {
  const keycloakIssuer = await Issuer.discover(process.env.KEYCLOAK_SERVER_URL);
  const { Client } = keycloakIssuer;
  const client = new Client({
    client_id: "wavers-sso",
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    redirect_uris: [`${process.env.BASE_URL}/api/v1/auth/redhat-sso/callback`],
    response_types: ["code"],
  });

  return client;
}
authRouter.get("/redhat-sso", async (req, res, next) => {
  const client = await initializeOIDC();
  const keycloakPassport = await keycloak(client);
  keycloakPassport.authenticate("oidc")(req, res, next);
});

//Login user with redhat sso
authRouter.get(
  "/redhat-sso/callback",
  async (req, res, next) => {
    const client = await initializeOIDC();
    const keycloakPassport = await keycloak(client);
    keycloakPassport.authenticate("oidc", {
      failureRedirect: "/error",
      failureFlash: true,
    })(req, res, next);
  },
  oauthSignIn
);

//Login user with google
authRouter.get(
  "/google",
  google.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/error",
    failureFlash: true,
  })
);

//Login user with google
authRouter.get(
  "/new-google",
  google.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/error",
    failureFlash: true,
    accessType: "offline",
    prompt: "consent",
  })
);
authRouter.get(
  "/google/callback",
  google.authenticate("google", {
    failureRedirect: "/error",
    failureFlash: true,
    session: false,
  }),
  oauthSignIn
);

// Login with facebook
authRouter.get(
  "/facebook",
  facebook.authenticate("facebook", { scope: ["email"] })
);

authRouter.get(
  "/facebook/callback",
  facebook.authenticate("facebook", {
    failureRedirect: "/error",
    failureFlash: true,
  }),
  oauthSignIn
);

// Login with LinkedIn
authRouter.get(
  "/linkedin",
  linkedin.authenticate("linkedin", { scope: ["email", "profile", "openid"] })
);

authRouter.get("/linkedin/callback", linkedInOauth, oauthSignIn);

// Login with github
authRouter.get(
  "/github",
  github.authenticate("github", { failureFlash: true })
);

authRouter.get(
  "/github/callback",
  github.authenticate("github", {
    failureFlash: true,
    failureRedirect: "/error",
  }),
  oauthSignIn
);

module.exports = { authRouter, currentSession };
