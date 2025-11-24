// config.js - API Configuration for Details Page
const API_CONFIG = {
    baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
    headers: {
        'x-rapidapi-key': '1e1db01977msh2f473f1cd5b75d9p12e28ejsnd36679ff359e',
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
    },
    cacheExpiry: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

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