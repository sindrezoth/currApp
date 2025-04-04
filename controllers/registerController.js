const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, password, phone, country } = req.body;

  if (!email || !password || !phone || !country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const duplicate = await Client.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'This email is already registered' });;
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const clientObject = { email, password, phone, country };

  const client = await Client.create(clientObject)

  if (client) {
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "email": client.email,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { "email": client.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      //secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });

  } else {
    res.status(400).json({ message: 'Invalid client data received' })
  }
}

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;
  console.log(refreshToken)

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
            "email": foundClient.email,
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
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', 
    //secure: true 
    });
    res.json({ message: 'Cookie cleared' });
}

module.exports = {
    register,
    refresh,
    logout
};
