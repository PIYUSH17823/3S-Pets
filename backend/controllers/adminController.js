const fs = require('fs').promises;
const path = require('path');
const Joi = require('joi');

const REVIEWS_PATH = path.join(__dirname, '../data/reviews.json');

const adminController = {
    /**
     * Public submission of a review (Pending status)
     */
    submitReview: async (req, res) => {
        try {
            const schema = Joi.object({
                user: Joi.string().required(),
                pet: Joi.string().required(),
                text: Joi.string().min(10).required(),
                rating: Joi.number().min(1).max(5).required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const data = await fs.readFile(REVIEWS_PATH, 'utf8');
            const reviews = JSON.parse(data);

            const newReview = {
                id: Date.now(),
                ...value,
                type: "Pending Verification",
                status: "pending", // For admin approval flow
                createdAt: new Date()
            };

            reviews.push(newReview);
            await fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2));

            res.status(201).json({ success: true, message: "Review submitted for approval! 🐾" });
        } catch (err) {
            res.status(500).json({ error: "Failed to submit review" });
        }
    },

    /**
     * Admin view of all reviews (including pending)
     */
    getAdminReviews: async (req, res) => {
        // Simple password check for now (to be replaced with JWT/Session later)
        if (req.headers['x-admin-pass'] !== process.env.ADMIN_PASS) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        try {
            const data = await fs.readFile(REVIEWS_PATH, 'utf8');
            res.status(200).json(JSON.parse(data));
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch admin reviews" });
        }
    },

    /**
     * Admin action: Approve or Delete
     */
    updateReviewStatus: async (req, res) => {
        if (req.headers['x-admin-pass'] !== process.env.ADMIN_PASS) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const { id, action } = req.body; // action: 'approve' or 'delete'

        try {
            const data = await fs.readFile(REVIEWS_PATH, 'utf8');
            let reviews = JSON.parse(data);

            if (action === 'delete') {
                reviews = reviews.filter(r => r.id !== id);
            } else if (action === 'approve') {
                const review = reviews.find(r => r.id === id);
                if (review) {
                    review.status = 'approved';
                    review.type = 'Verified Owner';
                }
            }

            await fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2));
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: "Action failed" });
        }
    }
};

module.exports = adminController;
