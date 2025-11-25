// search-service.js - Search Service for Homepage
class SearchService {
    constructor() {
        this.config = this.getApiConfig();
        
        this.endpoints = typeof HOMEPAGE_ENDPOINTS !== 'undefined' ? HOMEPAGE_ENDPOINTS : {
            searchDestination: 'searchDestination',
            searchHotels: 'searchHotels'
        };
    }

    // Get API configuration from localStorage or fallback
    getApiConfig() {
        try {
            // Try to get from localStorage first
            const storedConfig = localStorage.getItem('api_config');
            if (storedConfig) {
                return JSON.parse(storedConfig);
            }
            
            // Try to use global API_CONFIG
            if (typeof API_CONFIG !== 'undefined') {
                return API_CONFIG;
            }
            
            // Fallback
            console.warn('API configuration not found. Using fallback configuration.');
            return {
                baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
                headers: {
                    'x-rapidapi-key': this.getStoredApiKey(),
                    'x-rapidapi-host': this.getStoredApiHost()
                },
                cacheExpiry: 24 * 60 * 60 * 1000
            };
        } catch (error) {
            console.error('Error loading API config:', error);
            return this.getFallbackConfig();
        }
    }

    // Get stored API key from localStorage
    getStoredApiKey() {
        try {
            return localStorage.getItem('rapidapi_key') || '';
        } catch (error) {
            return '';
        }
    }

    // Get stored API host from localStorage
    getStoredApiHost() {
        try {
            return localStorage.getItem('rapidapi_host') || 'booking-com15.p.rapidapi.com';
        } catch (error) {
            return 'booking-com15.p.rapidapi.com';
        }
    }

    // Fallback configuration
    getFallbackConfig() {
        return {
            baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
            headers: {
                'x-rapidapi-key': this.getStoredApiKey(),
                'x-rapidapi-host': this.getStoredApiHost()
            },
            cacheExpiry: 24 * 60 * 60 * 1000
        };
    }

    // Generate cache key from endpoint and params
    generateCacheKey(endpoint, params) {
        return `booking_search_${endpoint}_${JSON.stringify(params)}`;
    }

    // Check if cache is valid
    isCacheValid(cacheKey) {
        try {
            const cachedData = localStorage.getItem(cacheKey);
            if (!cachedData) return false;

            const parsedData = JSON.parse(cachedData);
            const now = Date.now();
            return (now - parsedData.timestamp) < this.config.cacheExpiry;
        } catch (error) {
            console.error('Error checking cache validity:', error);
            return false;
        }
    }

    // Get data from cache
    getFromCache(cacheKey) {
        try {
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                return parsedData.data;
            }
        } catch (error) {
            console.error('Error retrieving from cache:', error);
        }
        return null;
    }

    // Save data to cache
    saveToCache(cacheKey, data) {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            console.log('Data saved to cache:', cacheKey);
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    // Make API request with CORS proxy fallback
    async makeRequest(endpoint, params) {
        const cacheKey = this.generateCacheKey(endpoint, params);
        
        // Check cache first
        if (this.isCacheValid(cacheKey)) {
            console.log('Using cached data for:', endpoint);
            return this.getFromCache(cacheKey);
        }

        // Build URL with parameters
        const urlParams = new URLSearchParams();
        
        // Handle different parameter formats
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                urlParams.append(key, params[key]);
            }
        });
        
        const url = `${this.config.baseUrl}/${endpoint}?${urlParams.toString()}`;

        console.log('Making API request to:', url);

        try {
            let response;
            
            // Try with CORS proxy first (more reliable)
            try {
                const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
                response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: this.config.headers
                });
                
                if (!response.ok) {
                    throw new Error(`CORS proxy failed: ${response.status}`);
                }
            } catch (proxyError) {
                console.log('CORS proxy failed, trying direct request...', proxyError);
                
                // Fallback to direct request
                response = await fetch(url, {
                    method: 'GET',
                    headers: this.config.headers
                });
            }

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API response received for:', endpoint, data);
            
            // Validate response structure - be more flexible
            if (!data) {
                throw new Error('Empty API response');
            }
            
            if (data.status === false) {
                const errorMessage = typeof data.message === 'string' ? data.message : 
                                   (data.message ? JSON.stringify(data.message) : 'Unknown API error');
                throw new Error(`API returned error: ${errorMessage}`);
            }
            
            // Save to cache
            this.saveToCache(cacheKey, data);
            
            return data;
        } catch (error) {
            console.error('API request error:', error);
            
            // Fallback to cached data even if expired
            const cachedData = this.getFromCache(cacheKey);
            if (cachedData) {
                console.log('Using expired cached data as fallback');
                return cachedData;
            }
            
            throw error;
        }
    }

    // Search destinations
    async searchDestination(query) {
        const params = {
            query: query
        };
        
        return await this.makeRequest(this.endpoints.searchDestination, params);
    }

    // Search hotels in destination
    async searchHotels(destId, searchParams = {}) {
        const params = {
            dest_id: destId,
            search_type: searchParams.search_type || 'city',
            arrival_date: searchParams.arrival_date || '2025-12-20',
            departure_date: searchParams.departure_date || '2025-12-25',
            adults: searchParams.adults || 1,
            children_age: searchParams.children_age || '0,17',
            room_qty: searchParams.room_qty || 1,
            page_number: searchParams.page_number || 1,
            units: searchParams.units || 'metric',
            temperature_unit: searchParams.temperature_unit || 'c',
            languagecode: searchParams.languagecode || 'en-us',
            currency_code: searchParams.currency_code || 'USD'
        };
        
        return await this.makeRequest(this.endpoints.searchHotels, params);
    }
}
