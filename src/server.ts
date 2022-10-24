import express from 'express'
// import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
import flash from 'express-flash'
import logger from 'morgan'
import connectDB from './config/database'
import mainRoutes from './routes/main'
import userRoutes from './routes/user'
import postsRoutes from './routes/posts'
import commentsRoutes from './routes/comments'
import dotenv from 'dotenv'
import passport_config from './config/passport'

const app = express()

// use environment variables
dotenv.config({ path: './src/config/.env' })

// passport config
passport_config(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"))

try {
  const DB_STRING = process.env.DB_STRING
  if (!DB_STRING) throw 'No Mongo URI provided'

  const SESSION_SECRET = process.env.SESSION_SECRET
  if (!SESSION_SECRET) throw 'No Session Secret Provided'

  // Sessions
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: DB_STRING
      }),
    })
  )
} catch (err) {
  console.error(err)
}

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/user', userRoutes)
app.use('/posts', postsRoutes)
app.use('/comments', commentsRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}, you better catch it!`)
})