const fs = require('fs').promises;
const path = require('path');

/**
 * Controller to handle customer review logic
 */
const reviewController = {
    /**
     * Gets all reviews from the local JSON storage
     */
    getAllReviews: async (req, res) => {
        try {
            const dataPath = path.join(__dirname, '../data/reviews.json');
            const data = await fs.readFile(dataPath, 'utf8');
            const reviews = JSON.parse(data);
            
            // Only return approved reviews to the public
            const approvedReviews = reviews.filter(rev => rev.status === 'approved' || !rev.status);
            
            res.status(200).json(approvedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            res.status(500).json({ 
                error: 'Failed to load reviews data', 
                details: error.message 
            });
        }
    }
};

module.exports = reviewController;
