// config.js - Centralized API Configuration

// API Credentials
const API_KEY = ' ';
const API_HOST = 'booking-com15.p.rapidapi.com';

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://booking-com15.p.rapidapi.com/api/v1/hotels',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
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
