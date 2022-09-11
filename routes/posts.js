const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const { ensureAuth } = require('../middleware/auth')

router.post("/createPost", upload.single("file"), postsController.createPost);
router.delete("/deletePost/:id", postsController.deletePost);

//export
module.exports = router