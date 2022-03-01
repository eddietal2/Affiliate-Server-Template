const express  = require("express");
const router  = express.Router();
var authController = require('../controllers/auth-controller.ts')

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/change-password-forgot', authController.changePasswordForgot);
router.post('/send-register-code', authController.sendRegisterCode);
router.post('/send-forgot-code', authController.sendForgotCode);


export {};

module.exports = router;