const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const productController = require('../controllers/productController');

// Enquiry Routes
router.post('/enquiry', enquiryController.createEnquiry);

// Product Catalog Routes
router.get('/products', productController.getAllProducts);

module.exports = router;
