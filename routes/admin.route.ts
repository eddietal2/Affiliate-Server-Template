const express  = require("express");
const router  = express.Router();
var adminController = require('../controllers/admin-controller.ts')

// User
router.get('/get-all-users', adminController.getAllUsers);
router.post('/delete-user', adminController.deleteUser);

// Products
router.post('/add-product', adminController.addProduct);
router.post('/edit-product', adminController.editProduct);
router.post('/delete-product', adminController.deleteProduct);


export {};

module.exports = router;