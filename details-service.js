// details-service.js - API Service for Hotel Details Page
class DetailsService {
    constructor() {
        this.config = typeof API_CONFIG !== 'undefined' ? API_CONFIG : {
            baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
            headers: {
                'x-rapidapi-key': '1e1db01977msh2f473f1cd5b75d9p12e28ejsnd36679ff359e',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            },
            cacheExpiry: 24 * 60 * 60 * 1000
        };
        
        this.endpoints = typeof DETAILS_ENDPOINTS !== 'undefined' ? DETAILS_ENDPOINTS : {
            hotelDetails: 'getHotelDetails',
            availability: 'getAvailability',
            qna: 'getQuestionAndAnswer',
            attractions: 'getPopularAttractionNearBy',
            reviews: 'getHotelReviewScores',
            photos: 'getHotelPhotos',
            policies: 'getHotelPolicies'
        };
    }

    // Generate cache key from endpoint and params
    generateCacheKey(endpoint, params) {
        return `booking_details_${endpoint}_${JSON.stringify(params)}`;
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
        const urlParams = new URLSearchParams(params);
        const url = `${this.config.baseUrl}/${endpoint}?${urlParams.toString()}`;

        console.log('Making API request to:', endpoint);

        try {
            // Try direct API call first
            let response = await fetch(url, {
                method: 'GET',
                headers: this.config.headers
            });

            // If CORS error occurs, try with CORS proxy
            if (!response.ok || response.status === 0) {
                console.log('Direct API failed, trying CORS proxy...');
                const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
                response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: this.config.headers
                });
            }

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API response received for:', endpoint);
            
            // Validate response structure
            if (!data || data.status === false) {
                throw new Error('Invalid API response structure');
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

    // Get hotel details
    async getHotelDetails(hotelId, searchParams = {}) {
        const params = {
            hotel_id: hotelId,
            adults: searchParams.adults || 1,
            children_age: searchParams.children_age || '0,17',
            room_qty: searchParams.room_qty || 1,
            units: searchParams.units || 'metric',
            temperature_unit: searchParams.temperature_unit || 'c',
            languagecode: searchParams.languagecode || 'en-us',
            currency_code: searchParams.currency_code || 'USD',
            arrival_date: searchParams.arrival_date || '2025-12-20',
            departure_date: searchParams.departure_date || '2025-12-25'
        };
        
        return await this.makeRequest(this.endpoints.hotelDetails, params);
    }

    // Get room availability
    async getAvailability(hotelId, searchParams = {}) {
        const params = {
            hotel_id: hotelId,
            min_date: searchParams.min_date || '2025-11-21',
            max_date: searchParams.max_date || '2025-11-28',
            room_qty: searchParams.room_qty || 1,
            adults: searchParams.adults || 1,
            currency_code: searchParams.currency_code || 'USD',
            location: searchParams.location || 'US'
        };
        
        return await this.makeRequest(this.endpoints.availability, params);
    }

    // Get questions and answers
    async getQnA(hotelId, languagecode = 'en-us') {
        const params = {
            hotel_id: hotelId,
            languagecode: languagecode
        };
        
        return await this.makeRequest(this.endpoints.qna, params);
    }

    // Get popular attractions nearby
    async getAttractions(hotelId, languagecode = 'en-us') {
        const params = {
            hotel_id: hotelId,
            languagecode: languagecode
        };
        
        return await this.makeRequest(this.endpoints.attractions, params);
    }

    // Get hotel review scores
    async getReviewScores(hotelId, languagecode = 'en-us') {
        const params = {
            hotel_id: hotelId,
            languagecode: languagecode
        };
        
        return await this.makeRequest(this.endpoints.reviews, params);
    }

    // Get hotel photos
    async getHotelPhotos(hotelId) {
        const params = {
            hotel_id: hotelId
        };
        
        return await this.makeRequest(this.endpoints.photos, params);
    }

    // Get hotel policies
    async getHotelPolicies(hotelId, languagecode = 'en-us') {
        const params = {
            hotel_id: hotelId,
            languagecode: languagecode
        };
        
        return await this.makeRequest(this.endpoints.policies, params);
    }
}