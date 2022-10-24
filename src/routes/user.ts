import express from 'express'
import upload from "../middleware/multer"
import userControllers from '../controllers/user'
const { getProfile, getUser, follow, unfollow, getEditProfile, updateProfile, updateAvatar } = userControllers
import { ensureAuth } from '../middleware/auth'

const router = express.Router()

router.get('/:username', ensureAuth, getProfile)
router.get('/get/user', getUser)
router.put('/follow/:username', ensureAuth, follow)
router.put('/unfollow/:username', ensureAuth, unfollow)
router.get('/edit/:username', ensureAuth, getEditProfile)
router.put('/update/:username', ensureAuth, updateProfile)
router.put('/updateAvatar/:username', upload.single("file"), ensureAuth, updateAvatar)

export default router