require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const verifyJWT = require('./middleware/verifyJWT.js');

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'Privacy Policy.txt'));
})

app.get('/terms-of-use', (req, res) => {
  res.sendFile(path.join(__dirname, 'Terms of Use.txt'));
})

app.use(express.static(path.join(__dirname, 'build', 'client')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'client', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'build', 'admin')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'admin', 'index.html'));
});

//app.use('/api', (req, res) => res.json({message: 'api'}))
app.use('/api/auth', require('./routes/authRoutes'))

app.use(verifyJWT);
app.use('/api/account', require('./routes/accountRoutes'))
app.use('/api/register', require('./routes/registerRoutes'))
app.use('/api/clients', require('./routes/clientRoutes'))
app.use('/api/admins', require('./routes/adminRoutes'))

app.use(errorHandler)

mongoose.set('strictQuery', true);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
