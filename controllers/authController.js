const Client = require('../models/Client');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password, username } = req.body;
  let errMessage = "";

  if(!email && !username) {
    if(!email) {
      errMessage += "Введите почту ";
    }
    else if(!username) {
      errMessage += "Введите имя пользователя ";
    }
  }

  if(!password) {
    errMessage += "и пароль."
  }

  if (errMessage.length) {
    return res.status(400).json({ message: errMessage });
  }


  let accessToken = "";
  let refreshToekn = "";

  if(email) {
    const foundClient = await Client.findOne({ email }).exec();
    if (!foundClient || !foundClient.active) {
      return res.status(401).json({ message: 'Не авторизированный пользователь. Войдите в аккаунт.' });
    }

    const match = password === foundClient.password; //await bcrypt.compare(password, foundClient.password);
    if (!match) return res.status(401).json({ message: 'Неверный пароль.' });

    accessToken = jwt.sign(
      {
        "UserInfo": {
          email: foundClient.email
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    refreshToken = jwt.sign(
      { "email": foundClient.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
  }

  if(username) {
    const foundAdmin = await Admin.findOne({ username }).exec();
    if (!foundAdmin || !foundAdmin.active) {
      return res.status(401).json({ message: 'Не авторизированный пользователь. Войдите в аккаунт.' });
    }

    const match = 
      //password === foundAdmin.password; 
      await bcrypt.compare(password, foundAdmin.password);
    if (!match) return res.status(401).json({ message: 'Неверный пароль.' });

    accessToken = jwt.sign(
      {
        "UserInfo": {
          username: foundAdmin.username,
          roles: foundAdmin.roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    refreshToken = jwt.sign(
      { "username": foundAdmin.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
  }

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,//true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
}

const refresh = (req, res) => {
  const cookies = req.headers.cookie;
  const t = req.headers;

  console.log('REFRESH')
  if (!cookies && !cookies?.includes('jwt')) return res.status(401).json({ message: 'Не авторизированный пользователь. Войдите в аккаунт.' });

  const refreshToken = cookies.slice(4);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Запрещено. Войдите в аккаунт.' });
      const { email, username } = decoded;
      
      let accessToken = "";
      if(email) {
        const foundClient = await Client.findOne({ email: decoded.email }).exec();
        if (!foundClient) return res.status(401).json({ message: 'Не авторизированный пользователь. Войдите в аккаунт.' });

        accessToken = jwt.sign(
          {
            "UserInfo": {
              email: foundClient.email,
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );
      }

      if(username) {
        const foundAdmin = await Admin.findOne({ username: decoded.username }).exec();
        if (!foundAdmin) return res.status(401).json({ message: 'Не авторизированный пользователь. Войдите в аккаунт.' });

        accessToken = jwt.sign(
          {
            "UserInfo": {
              username: foundAdmin.username,
              roles: foundAdmin.roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );
      }
      res.json({ accessToken });
    }
  );
}

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', 
    //secure: true 
    });
  res.json({ message: 'Куки очищенны.' });
}

module.exports = {
  login,
  refresh,
  logout
};
