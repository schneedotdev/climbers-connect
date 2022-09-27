const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer")
const userController = require('../controllers/user')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:username', ensureAuth, userController.getProfile)
router.put('/follow/:username', ensureAuth, userController.follow)
router.put('/unfollow/:username', ensureAuth, userController.unfollow)
router.get('/edit/:username', ensureAuth, userController.getEditProfile)
router.put('/update/:username', ensureAuth, userController.updateProfile)
router.put('/updateAvatar/:username', upload.single("file"), ensureAuth, userController.updateAvatar)

module.exports = router