const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const cookies = req.headers.cookie;

  let token;

  if(authHeader.startWith && authHeader.startWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (cookies?.includes('jwt')) {
    token = cookies.slice(4);
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }

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
