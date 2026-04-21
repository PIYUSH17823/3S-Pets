const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');
const adminController = require('../controllers/adminController');
const newsletterController = require('../controllers/newsletterController');

// Enquiry Routes
router.post('/enquiry', enquiryController.createEnquiry);

// Newsletter Routes
router.post('/newsletter', newsletterController.subscribe);

// Product Catalog Routes
router.get('/products', productController.getAllProducts);

// Review & Admin Routes
router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews/submit', adminController.submitReview);

// Protected Admin Routes
router.get('/admin/reviews', adminController.getAdminReviews);
router.post('/admin/reviews/action', adminController.updateReviewStatus);
router.post('/admin/broadcast', adminController.broadcastUpdate);

module.exports = router;
