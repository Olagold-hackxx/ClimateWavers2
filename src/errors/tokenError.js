const CustomAPIError = require('./customError');

class TokenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }

  // Redirect to get new refresh token
  redirect(req, res) {
	return res.redirect(`${process.env.BASE_URL}/api/v1/auth/new-google`);
  }
}

module.exports = TokenError;