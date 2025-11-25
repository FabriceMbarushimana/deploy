// config.js - API Configuration for Details Page

// API Endpoints for Details Page
const DETAILS_ENDPOINTS = {
    hotelDetails: 'getHotelDetails',
    availability: 'getAvailability',
    qna: 'getQuestionAndAnswer',
    attractions: 'getPopularAttractionNearBy',
    reviews: 'getHotelReviewScores',
    photos: 'getHotelPhotos',
    policies: 'getHotelPolicies'
};

// API Endpoints for Homepage
const HOMEPAGE_ENDPOINTS = {
    searchDestination: 'searchDestination',
    searchHotels: 'searchHotels'
};

const API_CONFIG = {
    BASE_URL: 'https://booking-com.p.rapidapi.com',
    ENDPOINTS: {
        SEARCH: '/v1/hotels/search',
        DETAILS: '/v1/hotels/data',
        PHOTOS: '/v1/hotels/photos',
        LOCATIONS: '/v1/hotels/locations'
    }
};
