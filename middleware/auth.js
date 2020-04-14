const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token)
    return res.status(401).json({ msg: 'No Token, Authorization Denied' });

  //Verify Token if present by decoding
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Since decoding is successful, make the user decoded
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
