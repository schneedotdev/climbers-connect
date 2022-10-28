import express from 'express'
import upload from '../middleware/multer'
import postControllers from '../controllers/posts'
const { createPost, deletePost, getFeed, getFollowing, getPost, likePost, unlikePost } = postControllers
import auth from '../middleware/auth'
const { ensureAuth } = auth

const router = express.Router()

router.post('/create', upload.single('file'), ensureAuth, createPost)
router.delete('/delete/:id', ensureAuth, deletePost)
router.get('/feed', getFeed)
router.get('/following', getFollowing)
router.get('/:id', getPost)
router.put('/like/:id', likePost)
router.put('/unlike/:id', unlikePost)

export default router