const express  = require("express");
const router  = express.Router();
var productsController = require('../controllers/products-controller.ts')

router.get('/get-featured-products', productsController.getFeaturedProducts);
router.get('/get-all-products', productsController.getAllProducts);
router.post('/get-product-info', productsController.getProductInfo);
router.post('/favorite-product', productsController.favoriteProduct);
router.post('/unfavorite-product', productsController.unfavoriteProduct);
router.post('/get-cart', productsController.getCart);
router.post('/add-to-cart', productsController.addToCart);
router.post('/remove-from-cart', productsController.removeFromCart);
router.post('/empty-cart', productsController.emptyCart);
router.post('/add-review', productsController.addReview);

export {};

module.exports = router;