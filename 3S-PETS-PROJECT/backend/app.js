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
// Relaxed for local testing; tighten this back up for production launch.
app.use(cors());

// Rate Limiting (Spam Protection)
// Max 5 contact form submissions per IP every 15 minutes.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

app.use(morgan('dev'));
app.use(bodyParser.json());

// Apply rate limiter specifically to our primary API routes
app.use('/api/v1', apiLimiter, apiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('3S PETS Backend is running smoothly! 🐾');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
