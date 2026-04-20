const fs = require('fs').promises;
const path = require('path');

/**
 * Controller to handle product catalog logic
 */
const productController = {
    /**
     * Gets all products from the local JSON storage
     */
    getAllProducts: async (req, res) => {
        try {
            const dataPath = path.join(__dirname, '../data/products.json');
            const data = await fs.readFile(dataPath, 'utf8');
            const products = JSON.parse(data);
            
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ 
                error: 'Failed to load catalog data', 
                details: error.message 
            });
        }
    }
};

module.exports = productController;
