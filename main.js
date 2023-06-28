const movieInput = document.getElementById("movie-input")
const searchButton = document.getElementById("search-btn")
const titleDiv = document.getElementById("title")
const yearDiv = document.getElementById("year")
const posterDiv = document.getElementById("poster")
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
        const { title } = data.results[0]
        const { release_date } = data.results[0]
        const { poster_path } = data.results[0]
        titleDiv.innerText = "Title: " + title
        yearDiv.innerText = "Release Date: " + release_date
        posterDiv.src = "https://image.tmdb.org/t/p/w200" + poster_path
    }
}

function removeSpace(input){
    movie = input.replace(/ /g, "+")
    return movie
}

searchButton.addEventListener("click", function(){
    movies.fetchMovies(removeSpace(movieInput.value))
})

