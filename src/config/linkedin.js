const linkedin = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy; // Use LinkedInStrategy



linkedin.use(
  new LinkedInStrategy(
    {
		clientID: process.env.LINKEDIN_CLIENT_ID,
		clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
		callbackURL: `${process.env.BASE_URL}/api/v1/auth/linkedin/callback`,
		scope: ['email', 'profile', 'openid'],
    },
    async (accessToken, refreshToken, profile, done) => {
		return done(null, profile )
	}
));

module.exports = linkedin;
