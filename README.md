TravelBook

API key fdf344faefmshddcdc140947d28ep1a6d12jsn6ba38bb73916 



A simple, user-friendly hotel recommendation platform built with HTML, CSS, and JavaScript, powered by the Booking.COM API via RapidAPI. The app allows users to search for hotels by city, view live pricing and ratings, and sort/filter results—all wrapped in a clean and responsive UI.

This project includes:
✔ Local development

✔ API integration

✔ Deployment on two web servers (Web01 & Web02)

✔ Load balancer configuration (Lb01)

✔ Secure handling of API keys

✔ Demo video + documentation

1. Overview of what a user can do:
Search for hotels by city

View hotel names, images, prices, and ratings

Sort results (e.g., by price or rating)

Filter results (e.g., minimum rating)

2. Live Demo Links
Demo Video: https://your-demo-link.com ⚙️ 3. Features 🔍 Search

Enter a city name (e.g., Paris) and fetch live hotels from the API.

📊 Sort

Sort hotels by:

Lowest price

Highest price

Highest rating

🎛️ Filter

Filter hotels by:

Minimum rating

Maximum price

⚠️ Error Handling

The app gracefully handles:

API downtime

Invalid responses

No results found

Network errors

The user sees a clean error message instead of a broken page.

🔗 4. API Used — Booking.com API (RapidAPI)

This application uses the Booking.com API via RapidAPI to retrieve:

Hotel names

Images

Ratings

Prices

Locations

🔐 API Key Security

API key is stored server-side in environment variables

Never committed to GitHub

.gitignore is used to hide any sensitive config files

📚 API Documentation

Booking.com API (RapidAPI): https://rapidapi.com/apidojo/api/booking

💻 5. Local Installation & Usage Prerequisites

A modern browser (Chrome, Firefox, Edge)

A Live Server extension or any simple HTTP server

Your RapidAPI key stored securely

🔧 Step 1 — Clone the repository git clone https://github.com/yourusername/hotel-recommender.git cd hotel-recommender

🔧 Step 2 — Add your API key

Create a file called config.js (DO NOT commit this file):

export const API_KEY = "your-rapidapi-key";

Make sure .gitignore includes:

config.js

🔧 Step 3 — Run locally

If using the VSCode Live Server extension:

Right-click index.html → “Open with Live Server”

Or using Node’s simple server:

npx http-server .

Then open:

http://localhost:8080

🚀 6. Deployment Instructions

This app was deployed to:

Web01

Web02

Load Balancer (Lb01)

Below are the exact steps taken.

🖥️ Step 1 — Upload files to Web01 & Web02

On both servers:

Create a directory:

mkdir /var/www/hotel

Copy project files using SCP, Git, or SFTP:

scp -r * user@web01:/var/www/hotel scp -r * user@web02:/var/www/hotel

Set correct permissions:

sudo chown -R www-data:www-data /var/www/hotel

Point Nginx/Apache to serve /var/www/hotel

⚖️ Step 2 — Configure Load Balancer (Lb01)

Load balancer config (example using Nginx):

upstream hotel_app { server web01-ip; server web02-ip; }

server { listen 80; server_name lb01;

location / {
    proxy_pass http://hotel_app;
}
}

Then restart:
