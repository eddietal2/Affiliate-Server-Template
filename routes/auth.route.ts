const express  = require("express");
const router  = express.Router();
var authController = require('../controllers/auth-controller.ts')

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/send-code', authController.sendSixDigitCode);
router.post('/change-password-forgot', authController.changePasswordForgot);

export {};

module.exports = router;