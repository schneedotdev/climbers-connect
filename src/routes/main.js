import express from 'express'
import authController from '../controllers/auth'
import homeController from '../controllers/home'

const router = express.Router()

router.get('/', homeController.getIndex)
router.get('/FAQ', homeController.getFAQ)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router