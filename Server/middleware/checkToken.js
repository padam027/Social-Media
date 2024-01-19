const jwt = require('jsonwebtoken');
const { error } = require('../utils/responseWrapper');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.send(error(401, 'Authorized header is required'));
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    // Decode the token
const decodeToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

// Check if either 'id' or '_id' is present in the decoded token
if (!decodeToken.id && !decodeToken._id) {
  return res.send(error(404, "Token does not contain a valid user ID"));
}

// Use whichever ID is present in the token
req._id = decodeToken.id || decodeToken._id;

// Query the user from the database
const user = await User.findById(req._id);

if (!user) {
  return res.send(error(404, "User not found"));
}
    next();
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
