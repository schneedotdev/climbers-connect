const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:username', ensureAuth, profileController.getProfile)
router.put('/follow/:username', ensureAuth, profileController.follow)
router.put('/unfollow/:username', ensureAuth, profileController.unfollow)
router.get('/edit/:username', ensureAuth, profileController.getEditProfile)
router.put('/update/:username', ensureAuth, profileController.updateProfile)

module.exports = router