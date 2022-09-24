const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const { removeTrailingSlash } = require('./middleware/redirectSlash')

const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const aboutRoutes = require('./routes/about')
const searchRoutes = require('./routes/search')
const dashboardRoutes = require('./routes/dashboard')


require('dotenv').config()

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI
      })
  })
);
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(removeTrailingSlash)
  
app.use('/', mainRoutes)
app.use('/search', searchRoutes)
app.use('/about', aboutRoutes)
app.use('/:user', dashboardRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port: ${process.env.PORT}`)
})    