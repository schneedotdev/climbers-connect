const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/user/:username', ensureAuth, postsController.getProfile)
router.put('/user/follow/:username', ensureAuth, postsController.follow)
router.put('/user/unfollow/:username', ensureAuth, postsController.unfollow)
router.get('/user/edit/:username', ensureAuth, postsController.edit)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router