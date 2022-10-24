import express from 'express'
import upload from '../middleware/multer'
import postsControllers from '../controllers/posts'
const { createPost, deletePost, getFeed, getFollowing, getPost, likePost, unlikePost } = postsControllers
import { ensureAuth } from '../middleware/auth'

const router = express.Router()

router.post('/create', upload.single('file'), ensureAuth, createPost)
router.delete('/delete/:id', ensureAuth, deletePost)
router.get('/feed', getFeed)
router.get('/following', getFollowing)
router.get('/:id', getPost)
router.put('/like/:id', likePost)
router.put('/unlike/:id', unlikePost)

export default router