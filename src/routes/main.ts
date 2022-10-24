import express from 'express'
import authControllers from '../controllers/auth'
const { getLogin, postLogin, logout, getSignup, postSignup } = authControllers
import homeControllers from '../controllers/home'
const { getIndex, getFAQ } = homeControllers

const router = express.Router()

router.get('/', getIndex)
router.get('/FAQ', getFAQ)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get('/logout', logout)
router.get('/signup', getSignup)
router.post('/signup', postSignup)

export default router