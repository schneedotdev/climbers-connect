import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const DB_STRING = process.env.DB_STRING
    if (!DB_STRING) throw 'MongoDB connection string: "DB_STRING" not provided'

    const conn = await mongoose.connect(DB_STRING)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}