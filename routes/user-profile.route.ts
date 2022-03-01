const express  = require("express");
const router  = express.Router();
var userProfileController = require('../controllers/user-profile-controller.ts')

router.post('/change-name', userProfileController.changeName);
router.post('/change-email', userProfileController.changeEmail);
router.post('/change-password', userProfileController.changePassword);
router.post('/subscribe-to-newsletter', userProfileController.subscribeToNewsletter);
router.post('/unsubscribe-to-newsletter', userProfileController.unsubscribeToNewsletter);
router.post('/get-favorite-products', userProfileController.getFavoriteProducts);

export {};

module.exports = router;