const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts')
const { ensureAuth } = require('../middleware/auth')

router.post('/create', upload.single('file'), ensureAuth, postsController.createPost)
// router.delete('/deleteClimb/:id', postController.deleteClimb)
router.get('/feed', postsController.getFeed)
router.get('/following', postsController.getFollowing)
router.get('/:id', postsController.getPost)

module.exports = router