
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

## Details of This Version

* ```Log In Credentials```
    * Basic User - email: basic@basic.com, password: Basic123#
    * Silver User - email: silver@silver.com, password: Silver123#
    * Gold User - email: gold@gold.com, password: Gold123#

* ```Register``` works and can be used to create a new user.
 
    **However, all changes associated with the user (including the 3 above) and the user itself (excluding the 3 above) will be deleted once you sign out.**

* ```Home Page```
All movies on the carousel, all visible cards (the first 9 in the slider) until the Top Series section, and the first card in each of the sections below have corresponding movie pages. The rest redirects to the movie page of Titanic.

* ```Genre Modals```
Have data for all genres until Fantasy, the rest just reuses data from the Action genre

* ```Pricing```
On clicking the button your plan immediately switches to the selected and the lemonsqueezy page opens up.

* ```Autocomplete```
Available for each letter of “iron man” from ‘i’ to ‘n’. Small letters only

* ```Fuzzy```
Available for “iron man” and “man builds suit in a cave”

