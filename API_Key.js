// API_Key.js - Centralized API Configuration


const API_CONFIG = {
    baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
    headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
    },
    cacheExpiry: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

// Store in localStorage for persistence
try {
    localStorage.setItem('api_config', JSON.stringify(API_CONFIG));
} catch (error) {
    console.error('Failed to store API config in localStorage:', error);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG };
}
