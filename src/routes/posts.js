import express from 'express'
import upload from '../middleware/multer'
import postsController from '../controllers/posts'
import { ensureAuth } from '../middleware/auth'

const router = express.Router()

router.post('/create', upload.single('file'), ensureAuth, postsController.createPost)
router.delete('/delete/:id', ensureAuth, postsController.deletePost)
router.get('/feed', postsController.getFeed)
router.get('/following', postsController.getFollowing)
router.get('/:id', postsController.getPost)
router.put('/like/:id', postsController.likePost)
router.put('/unlike/:id', postsController.unlikePost)

export default router