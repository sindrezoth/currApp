const Admin = require('../models/Admin');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const foundAdmin = await Admin.findOne({ username }).exec();

    if (!foundAdmin || !foundAdmin.active) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = password === foundAdmin.password; //await bcrypt.compare(password, foundAdmin.password);

    if (!match) return res.status(401).json({ message: 'Wrong password. Try again.' });

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          username: foundAdmin.username,
          roles: foundAdmin.roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { "username": foundAdmin.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles 
    res.json({ accessToken });
}

const refresh = (req, res) => {
  console.log('asdfasdf')
  const cookies = req.cookies;
  console.log('asdf')
  console.log(req.headers);

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundAdmin = await Admin.findOne({ username: decoded.username }).exec();
      if (!foundAdmin) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign({
          "UserInfo": {
            username: foundAdmin.username,
            roles: foundAdmin.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    }
  );
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });
}

module.exports = {
    login,
    refresh,
    logout
};
