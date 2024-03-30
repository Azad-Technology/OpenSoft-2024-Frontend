
# Open Soft 2024 - FRONTEND

## Project Structure
The project is structured as follows, ensuring modular and organized management of various functionalities.

```bash
src
    ├───assets
    ├───Components
    │   ├───Card
    │   ├───Carousel
    │   ├───CommentCard
    │   ├───Footer
    │   ├───GenreModal
    │   ├───HomeSliders
    │   ├───Loader
    │   ├───LoginAcceptedRejected
    │   ├───LoginExpired
    │   ├───LoginForm
    │   ├───movieList
    │   ├───moviePage
    │   │   └───MoreLikeThis
    │   ├───Navbar
    │   ├───NotFound
    │   ├───Pricing
    │   ├───profile
    │   ├───SearchPage
    │   ├───SignUp
    │   └───Watchlists
    └───MyContexts
```
## Setup and Installation

Setup
```bash
Clone the Repository
Change directory to the Repository
Paste the link to the backend server in the .env file 
VITE_BACKEND_URL={URL TO BACKEND SERVER}
```

Installating Dependencies
```bash
npm i
```

Run the Application
```bash
npm run dev
```
Link to the deployed website 
```bash
https://popkorn.tech
```
## Routes

* ```/ ``` - Home Page
* ```/pricing ``` - Pricing Page
* ```/profile ``` - Profile Page
* ```/search/${query} ``` - Search Page
* ```/login ``` - Login Page
* ```/signup ``` - Signup Page

## Features

* ```Search ``` 
    * Real time auto complete suggestions
    * Highlighted fuzzy and Semantic search results
    * Support Natural Language Queries

* ```Recommendation System```
    * Personal recommendations based on likes
    * Utilizes a fine tuned TF - IDF model
    * Based on relevance and critic ratings

* ```Advanced Video Playback```
    * Switch resolution with adaptive bit rate
    * Includes speed control, picture-in-picture
    * Continue watching from where you left

* ```Favourite and Watchlist```
    * Create curated watchlists
    * Mark favourite movies and tv shows

