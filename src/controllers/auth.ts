import passport from 'passport'
import validator from 'validator'
import User from '../models/User'
import Profile from '../models/Profile'

export default {
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect(`/user/${req.user.username}`)
    }
    res.render('account/login', {
      title: 'Login'
    })
  },
  postLogin: (req, res, next) => {
    const validationErrors: { msg: string }[] = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || `/user/${user.username}`)
      })
    })(req, res, next)
  },
  postDemo: (req, res, next) => {
    req.body = {
      "email": process.env.DEMO_EMAIL,
      "password": process.env.DEMO_PASSWORD
    }
    
    passport.authenticate('local', (err, user, info) => {
      console.log(user)
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(`/user/demouser`)
      })
    })(req, res, next)
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      console.error(err)
      req.user = null
      res.redirect('/login')
    })
  },
  getSignup: (req, res) => {
    if (req.user) {
      return res.redirect(`/user/${req.user.username}`)
    }
    res.render('account/signup', {
      title: 'Sign Up'
    })
  },
  postSignup: (req, res, next) => {
    const validationErrors: { msg: string }[] = []
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." })
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      })
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" })

    if (validationErrors.length) {
      req.flash("errors", validationErrors)
      return res.redirect("../signup")
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    })

    const profile = new Profile({
      name: req.body.username.toLowerCase(),
      avatar: {
        url: 'https://res.cloudinary.com/ddxox70fb/image/upload/v1664301459/default-avatar2_lngpkb.png',
        id: ''
      },
      posts: [],
      followers: [],
      following: [],
      likes: [],
      user: ''
    })

    const user = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: req.body.password,
      profile: profile._id
    })

    profile.user = user._id

    User.findOne(
      { $or: [{ email: req.body.email }, { username: req.body.username }] },
      (err, existingUser) => {
        if (err) {
          return next(err)
        }
        if (existingUser) {
          req.flash("errors", {
            msg: "Account with that email address or username already exists.",
          })
          return res.redirect("../signup")
        }
        profile.save()
        user.save((err) => {
          if (err) {
            return next(err)
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err)
            }
            res.redirect(`/user/${user.username}`)
          })
        })
      }
    )
  }
}