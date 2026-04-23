// js/api.js
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8125/api/v1'
    : `${window.location.protocol}//${window.location.hostname}/api/v1`;

const ApiService = {
    /**
     * Subscribe to newsletter
     */
    async subscribeNewsletter(formData) {
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Newsletter subscription failed');
            return await response.json();
        } catch (error) {
            console.error("Newsletter Error:", error);
            throw error;
        }
    },

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
    },

    /**
     * Fetches all reviews from the backend
     * @returns {Promise<Array>} The review data array
     */
    async getReviews() {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews`);
            if (!response.ok) throw new Error('Failed to fetch reviews');
            return await response.json();
        } catch (error) {
            console.error("ApiService Review Error:", error);
            // Fallback to null so the renderer can use local data if needed
            return null;
        }
    },

    /**
     * Submits a new review for approval
     */
    async submitReview(reviewData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) throw new Error('Submission failed');
            return await response.json();
        } catch (error) {
            console.error("Submission error:", error);
            throw error;
        }
    },

    /**
     * Fetches all reviews for admin manager
     */
    async broadcast(pass, subject, message) {
        const response = await fetch(`${API_BASE_URL}/admin/broadcast`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-admin-pass': pass },
            body: JSON.stringify({ subject, message })
        });
        return await response.json();
    },

    async getAdminReviews(password) {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/reviews`, {
                headers: { 'x-admin-pass': password }
            });
            if (!response.ok) throw new Error('Auth failed');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Updates review status (approve/delete)
     */
    async updateReviewStatus(password, reviewId, action) {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/reviews/action`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-admin-pass': password 
                },
                body: JSON.stringify({ id: reviewId, action })
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};

// Global export
window.ApiService = ApiService;
