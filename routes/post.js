const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer")
const postController = require("../controllers/post")
const { ensureAuth } = require('../middleware/auth')

router.post("/create/climbPost", upload.single("file"), ensureAuth, postController.createClimbPost)
// router.delete("/deleteClimb/:id", postController.deleteClimb)
router.post("/create/connectPost", ensureAuth, postController.createConnectPost)
// router.delete("/deleteConnect/:id", postController.deleteConnect)

module.exports = router