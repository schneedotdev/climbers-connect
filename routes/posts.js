const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer")
const postsController = require("../controllers/posts")
const { ensureAuth } = require('../middleware/auth')

router.post("/createClimb", upload.single("file"), postsController.createClimb)
router.delete("/deleteClimb/:id", postsController.deleteClimb)
router.post("/createPartnerSearch", upload.single("file"), postsController.createPartnerSearch)
router.delete("/deletePartnerSearch/:id", postsController.deletePartnerSearch)

module.exports = router