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
    }
};

// Global export
window.ApiService = ApiService;
