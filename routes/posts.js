const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts')
const { ensureAuth } = require('../middleware/auth')

router.post('/create/climbPost', upload.single('file'), ensureAuth, postsController.createClimbPost)
// router.delete('/deleteClimb/:id', postController.deleteClimb)
router.post('/create/connectPost', ensureAuth, postsController.createConnectPost)
// router.delete('/deleteConnect/:id', postController.deleteConnect)
router.get('/feed', postsController.getFeed)
router.get('/following', postsController.getFollowing)


module.exports = router