const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// Enquiry Routes
router.post('/enquiry', enquiryController.createEnquiry);

module.exports = router;
