const movieInput = document.getElementById("movie-input")
const searchButton = document.getElementById("search-btn")
const titleDiv = document.getElementById("title")
const yearDiv = document.getElementById("year")
const posterDiv = document.getElementById("poster")
const descriptionDiv = document.getElementById("description")
const watchlistBtn = document.getElementById("watchlist-button")
const watchlist = document.getElementById("watchlist")

let watchlistPosters = document.querySelectorAll(".watchlist-poster")
let movies = {
    "apiKey": "d5d9d36efa059c70e941563bcafdbf0c",
    fetchMovies: function(movie){
        fetch(
        "https://api.themoviedb.org/3/search/movie?query="
        + movie +
        "&api_key=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.renderData(data)) 

    }, 
    renderData: function(data){
        console.log(data)
        yearDiv.innerText = ""

        if (data.results.length === 0){
            titleDiv.innerText = "No movie found by that name."
            posterDiv.innerText = ""
        } else {
        watchlistBtn.style.display = "inline"
        const { title } = data.results[0]
        const { release_date } = data.results[0]
        const { poster_path } = data.results[0]
        const { overview } = data.results[0]
        titleDiv.innerText = title
        yearDiv.innerText = "Release Date: " + release_date
        posterDiv.src = "https://image.tmdb.org/t/p/w200" + poster_path
        descriptionDiv.innerText = overview
        }
        
    }
}

watchlist.innerHTML = "No Movies Added Yet"

function removeSpace(input){
    movie = input.replace(/ /g, "+")
    return movie
}

searchButton.addEventListener("click", function(){
    movies.fetchMovies(removeSpace(movieInput.value))
    movieInput.value = ""
})

movieInput.addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        event.preventDefault()
        searchButton.click()
    }
})

watchlistBtn.addEventListener("click", addMovie)

function addMovie(){
    if (watchlist.innerHTML === "No Movies Added Yet"){
        watchlist.innerHTML = ""
        const poster = document.createElement("img");
        poster.setAttribute('src', posterDiv.src);
        poster.setAttribute('class', 'watchlist-poster');
        poster.setAttribute('data-title', titleDiv.innerText);
        watchlist.appendChild(poster);
        renderEvent()
    } else {
        const poster = document.createElement("img");
        poster.setAttribute('src', posterDiv.src);
        poster.setAttribute('class', 'watchlist-poster');
        poster.setAttribute('data-title', titleDiv.innerText);
        watchlist.appendChild(poster);
        renderEvent()
    }
    
}

function renderEvent() {
    watchlistPosters = document.querySelectorAll(".watchlist-poster")
    watchlistPosters.forEach(poster => {
        poster.addEventListener('click', function() {
            movies.fetchMovies(this.dataset.title)
        })
      })
      watchlistPosters.forEach(poster => {
        poster.addEventListener('dblclick', function() {
            this.remove()
        })
      })
}




