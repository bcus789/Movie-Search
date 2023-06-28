const cityInput = document.getElementById("city-input")
const sbmtBtn = document.querySelector(".search-btn")
let weather = {
    "apiKey": "5ef8df34b119e7453728c4d5b53d19b2",
    fetchWeather: function(city){
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data)) 
    },
    displayWeather: function(data){
        const {name} = data
        const {icon, description} = data.weather[0]
        const {temp, humidity} = data.main
        const {speed} = data.wind
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = name
        document.querySelector(".temp").innerText = temp
        document.querySelector(".description").innerText = description
        document.querySelector(".humidity").innerText = humidity + "%"
        document.querySelector(".wind").innerText = speed + " mph"
    }
}



sbmtBtn.addEventListener("click", function(){
    weather.fetchWeather(cityInput.value)
})

cityInput.addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.fetchWeather(cityInput.value)
    }
})