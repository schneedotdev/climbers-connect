import express from 'express'
import commentsController from '../controllers/comments'
import { ensureAuth } from '../middleware/auth'

const router = express.Router()

router.post('/create', ensureAuth, commentsController.createComment)
router.delete('/delete/:id', ensureAuth, commentsController.deleteComment)

export default router