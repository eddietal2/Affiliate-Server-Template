const express  = require("express");
const router  = express.Router();
var landingPageController = require('../controllers/landing-page-controller.ts')

router.get('/get-featured-products', landingPageController.getFeaturedProducts);
router.get('/landing-page-info', landingPageController.landingPageInfo);
router.post('/membership-sign-up', landingPageController.membershipSignUp);


export {};

module.exports = router;