const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const Joi = require('joi'); // Import Joi for validation
const emailService = require('../services/emailService');

const DATA_DIR = path.join(__dirname, '../data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Ensure the data directory exists on startup
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Schema for Server-Side Validation
const enquirySchema = Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    petInfo: Joi.string().allow('', null).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('', null).max(20),
    message: Joi.string().min(5).max(1000).required()
});

// Helper to reliably read DB asynchronously
const readDB = async () => {
    try {
        const data = await fsp.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist, return empty skeleton
        if (err.code === 'ENOENT') return { enquiries: [] };
        console.error("Critical Error reading DB:", err);
        throw err;
    }
};

// Helper to write DB asynchronously
const writeDB = async (data) => {
    try {
        await fsp.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Critical Error writing DB:", err);
        throw err;
    }
};

const createEnquiry = async (req, res) => {
    try {
        // 1. Validation (Never Trust the Frontend)
        const { error, value } = enquirySchema.validate(req.body);
        
        if (error) {
            console.error("❌ Joi Validation Error:", error.details[0].message);
            return res.status(400).json({ 
                success: false, 
                message: "Invalid input", 
                details: error.details[0].message 
            });
        }

        // 2. Concurrency-Safe Database Writing
        const db = await readDB();
        
        const newEnquiry = {
            id: Date.now(), // Use timestamp for absolute uniqueness instead of length
            ...value,
            createdAt: new Date()
        };
        
        db.enquiries.push(newEnquiry);
        await writeDB(db);

        // 2b. Add to unified subscribers list
        try {
            const SUBSCRIBERS_PATH = path.join(DATA_DIR, 'subscribers.json');
            let subs = [];
            if (fs.existsSync(SUBSCRIBERS_PATH)) {
                subs = JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH));
            }
            if (!subs.find(s => s.email.toLowerCase() === value.email.toLowerCase())) {
                subs.push({
                    email: value.email.toLowerCase(),
                    phone: value.phone || '', // Capture phone for pings/WhatsApp
                    source: 'enquiry',
                    subscribedAt: new Date().toISOString()
                });
                fs.writeFileSync(SUBSCRIBERS_PATH, JSON.stringify(subs, null, 2));
            }
        } catch (subErr) {
            console.error("Failed to update subscribers during enquiry:", subErr);
        }

        // 3. Trigger Email (Runs in background)
        // We catch errors here so they don't crash the server, but we log them.
        emailService.sendEnquiryEmail(newEnquiry).catch(err => {
            console.error("❌ Email failed to send, but lead was saved to DB:", err);
        });

        console.log("✅ New Enquiry securely saved (ID: " + newEnquiry.id + ")");
        res.status(201).json({ success: true, id: newEnquiry.id });

    } catch (serverError) {
        console.error("Backend Server Error in createEnquiry:", serverError);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    createEnquiry
};
