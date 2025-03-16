const Client = require('../models/Client');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundClient = await Client.findOne({ email }).exec();
  if (!foundClient || !foundClient.active) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = password === foundClient.password; //await bcrypt.compare(password, foundClient.password);
  if (!match) return res.status(401).json({ message: 'Wrong password. Try again.' });

  const accessToken = jwt.sign(
    {
      "UserInfo": {
        email: foundClient.email
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { "email": foundClient.email },
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
  const cookies = req.cookies;
  

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;



  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundClient = await Client.findOne({ email: decoded.email }).exec();
      if (!foundClient) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          "UserInfo": {
            email: foundClient.email,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    }
  );
}

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
