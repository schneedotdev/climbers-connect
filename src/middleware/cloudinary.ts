import cloudinary from "cloudinary"
import dotenv from 'dotenv'

cloudinary.v2
dotenv.config({ path: "./src/config/.env" })

try {
    const CLOUD_NAME = process.env.CLOUD_NAME
    if (!CLOUD_NAME) throw 'Cloudinary name: "CLOUD_NAME" not provided'

    const API_KEY = process.env.API_KEY
    if (!API_KEY) throw 'Cloudinary key: "API_KEY" not provided'

    const API_SECRET = process.env.API_SECRET
    if (!API_SECRET) throw 'Cloudinary secret: "API_SECRET" not provided'

    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
    })
} catch (err) {
    console.error(err)
}

export default cloudinary