import bcrypt from 'bcrypt'
import mongoose, { Types } from 'mongoose'

export interface UserType {
  username: string
  password: string
  email: string
  profile: Types.ObjectId
}

const UserSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

// Password hash middleware.
UserSchema.pre('save', function save(next) {
  if (!this.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) { return next(err) }
      this.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

export default mongoose.model<UserType>('User', UserSchema)