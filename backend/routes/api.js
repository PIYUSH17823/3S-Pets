const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');
const adminController = require('../controllers/adminController');

// Enquiry Routes
router.post('/enquiry', enquiryController.createEnquiry);

// Product Catalog Routes
router.get('/products', productController.getAllProducts);

// Review & Admin Routes
router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews/submit', adminController.submitReview);

// Protected Admin Routes
router.get('/admin/reviews', adminController.getAdminReviews);
router.post('/admin/reviews/action', adminController.updateReviewStatus);

module.exports = router;
