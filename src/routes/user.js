import express from 'express'
import upload from "../middleware/multer"
import userController from '../controllers/user'
import { ensureAuth } from '../middleware/auth'

const router = express.Router()

router.get('/:username', ensureAuth, userController.getProfile)
router.get('/get/user', userController.getUser)
router.put('/follow/:username', ensureAuth, userController.follow)
router.put('/unfollow/:username', ensureAuth, userController.unfollow)
router.get('/edit/:username', ensureAuth, userController.getEditProfile)
router.put('/update/:username', ensureAuth, userController.updateProfile)
router.put('/updateAvatar/:username', upload.single("file"), ensureAuth, userController.updateAvatar)

export default router