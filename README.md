# TravelBook

## Overview

This project is a TravelBook web application . The platform allows users to search for hotels and attractions worldwide, view detailed information.

The project leverages external APIs for data fetching and is deployed across two web servers with a load balancer to ensure high availability and scalability.

## Links


- **Demo Video:** [https://youtu.be/ah5IsNyl3Tc](https://youtu.be/ah5IsNyl3Tc)
- **GitHub Repository:** [GitHub Repository](https://github.com/FabriceMbarushimana/deploy)
 
## Features

### User Features
- Search hotels and attractions globally
- View hotel and attraction details (images, amenities, contact info)
- Make bookings with mock payment integration
- Create an account and manage bookings locally using localStorage
- Interactive UI with filtering, sorting, and search functionality

### Technical Features
- External API integration (API key in API_Key.js)
- Deployed on two web servers (Web01 & Web02) with load balancer (Lb01)
- Fully responsive design (desktop, tablet, mobile)
- Clean Airbnb-inspired UI design

## Getting Started

### Prerequisites

- API key: `7b5cc0b3dbmsh0be3c06cd09fd82p15b215jsn7cdc2aa45b10`

### Installation

1. Clone the repository:
```
git clone https://github.com/FabriceMbarushimana/deploy.git
cd deploy
```


2. Add your API key in `API_Key.js`:
```javascript

7b5cc0b3dbmsh0be3c06cd09fd82p15b215jsn7cdc2aa45b10

 headers: {
        'x-rapidapi-key': 'Add above API key here',
    },

```

3. Run the application:
```
index.html
```

4. Open your browser at `http://localhost:3000`

## Deployment

### Server Setup
- Deploy to Web01 and Web02 using NGINX or Apache
- Configure load balancer (Lb01) for traffic distribution
- Verify via load balancer URL

### Load Balancer Configuration
- Use round-robin or least connections strategy
- Configure health checks for both servers
- Ensure API requests work consistently across servers

## Application Structure

### Pages
- **Home Page:** Search, popular destinations, top attractions, deals carousel
- **Results Page:** Filterable results with pagination
- **Details Page:** Image gallery, pricing, reviews, map


## API Integration
- External API for hotel and attraction data
- API key stored in API_Key.js
- Error handling for API requests



## Credits
- External API providers
- Airbnb.com (design inspiration)

