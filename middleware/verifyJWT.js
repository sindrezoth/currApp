const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //console.log(req.headers);

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const { username, roles, email } = decoded.UserInfo;
      console.log(decoded.UserInfo)

      if(email) {
        req.client = { email };
      }
      else if( username || (roles && Array.isArray(roles) && roles.length)) {
        req.admin = { username, roles };
      }
      next();
    }
  );
};

module.exports = verifyJWT;
