require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080;

// Security Middleware
app.use(helmet());

// Cross-Origin Resource Sharing (CORS) Security
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Go away! CORS policy violation.'));
        }
    }
}));

// Rate Limiting (Spam Protection)
// General API limiter: 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: 'Too many requests from this IP, please try again later.' }
});

// Strict limiter for contact form only: 5 submissions per 15 minutes
const enquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { error: 'Too many enquiries sent. Please wait 15 minutes.' }
});

app.use(morgan('dev'));
app.use(bodyParser.json());

// Apply general limiter to all API routes
app.use('/api/v1', generalLimiter);

// Apply strict limiter ONLY to the enquiry submission
app.use('/api/v1/enquiry', enquiryLimiter);

// Register routes
app.use('/api/v1', apiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('3S PETS Backend is running smoothly! 🐾');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
