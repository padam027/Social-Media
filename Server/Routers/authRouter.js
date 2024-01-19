const authController = require('../Controllers/authController')

const router = require('express').Router();

router.post('/register', authController.registerController );
router.post('/login', authController.loginController);
router.get('/refresh', authController.refreshAccessTokenController);
router.post("/logout", authController.logoutController);




module.exports = router;