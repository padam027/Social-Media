const router = require('express').Router();
const postController = require('../Controllers/postController');
const checkToken = require('../middleware/checkToken');

router.post("/createPost", checkToken, postController.createPostController);
router.post("/like-unlike", checkToken, postController.LikeUnlikeController);
router.put("/", checkToken, postController.updatePostController);
router.delete("/",  checkToken, postController.deletePostController);

module.exports = router;