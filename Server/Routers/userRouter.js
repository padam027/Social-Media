const router = require("express").Router();
const checkToken = require("../middleware/checkToken");
const userController = require('../Controllers/userController');


router.post("/follow-unfollow", checkToken, userController.FollowUnfollowUserController);
router.get("/getFeedData", checkToken, userController.getpostFollowingUserController);
router.get("/getMyPosts" , checkToken, userController.getmypostsController);
router.get("/getUserPosts", checkToken, userController.getUserPostsController);
router.delete("/", checkToken, userController.deleteMyProfileController);
router.get("/getMyInfo", checkToken, userController.getMyInfoContoller);
router.put("/" , checkToken, userController.updateMyprofileController);
router.post('/getUserProfile', checkToken, userController.getUserProfileController);



module.exports = router;