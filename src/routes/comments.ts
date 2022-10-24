import express from 'express'
import commentControllers from '../controllers/comments'
const { createComment, deleteComment } = commentControllers
import auth from '../middleware/auth'
const { ensureAuth } = auth

const router = express.Router()

router.post('/create', ensureAuth, createComment)
router.delete('/delete/:id', ensureAuth, deleteComment)

export default router