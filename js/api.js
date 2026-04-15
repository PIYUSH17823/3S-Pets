// js/api.js
const API_BASE_URL = 'http://localhost:8080/api/v1';

const ApiService = {
    /**
     * Sends a contact enquiry to the backend
     * @param {Object} formData { fullName, petInfo, email, phone, message }
     */
    async sendEnquiry(formData) {
        try {
            const response = await fetch(`${API_BASE_URL}/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.details || 'Server rejected the request');
            }
            
            return await response.json();
        } catch (error) {
            console.error("ApiService Error:", error);
            throw error;
        }
    },

    /**
     * Fetches all products from the backend catalog
     * @returns {Promise<Object>} The product catalog data
     */
    async getProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error("ApiService Product Error:", error);
            throw error;
        }
    }
};

// Global export
window.ApiService = ApiService;
