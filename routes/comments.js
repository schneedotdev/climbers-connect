const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/comments')
const { ensureAuth } = require('../middleware/auth')

router.post('/create', ensureAuth, commentsController.createComment)

module.exports = router