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
  //res.json({message: 'asdfasdf'})
  res.sendFile(path.join(__dirname, 'Privacy Policy.txt'));
})

app.get('/terms-of-use', (req, res) => {
  //res.json({message: 'asdfasdf'})
  res.sendFile(path.join(__dirname, 'Terms of Use.txt'));
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/adm/auth', require('./routes/admAuthRoutes'))
app.use(verifyJWT);
app.use('/api/account', require('./routes/accountRoutes'))
app.use('/api/register', require('./routes/registerRoutes'))
app.use('/api/clients', require('./routes/clientRoutes'))
app.use('/api/adm/clients', require('./routes/admClientsRoutes'))
app.use('/api/adm/admins', require('./routes/admAdminsRoutes'))

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//app.use('/', require('./routes/root'))


//app.all('*', (req, res) => {
//    res.status(404)
//    if (req.accepts('html')) {
//        res.sendFile(path.join(__dirname, 'views', '404.html'))
//    } else if (req.accepts('json')) {
//        res.json({ message: '404 Not Found' })
//    } else {
//        res.type('txt').send('404 Not Found')
//    }
//})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
