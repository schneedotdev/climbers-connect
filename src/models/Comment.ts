import mongoose, { Types } from 'mongoose'
export interface CommentType {
    text: string
    user: Types.ObjectId
    post: Types.ObjectId
    likes: number
    createdAt: Date
}

const CommentSchema = new mongoose.Schema<CommentType>({
    text: {
        type: String,
        required: true,
        maxLength: 1000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<CommentType>('Comment', CommentSchema)