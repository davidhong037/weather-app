const container = document.querySelector('.container'),
    inputPart = container.querySelector('.input-section'),
    infoText = inputPart.querySelector('.info-text'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button'),
    weatherIcon = container.querySelector(".weather-section img"),
    backFeature = container.querySelector("header i")


let api
let apiKey = ''

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert('Your browser does not support geolocation api')
    }
})

function onSuccess(position) {
    const { latitude, longitude } = position.coords
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
    fetchData()
}

function onError(error) {
    infoText.innerText = error.message
    infoText.classList.add("error")
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    fetchData()
}

function fetchData() {
    infoText.innerText = "Getting weather details..."
    infoText.classList.add("pending")
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result))
}

function weatherDetails(info) {
    infoText.classList.replace("pending", "error")
    if (info.cod == "404") {
        infoText.innerText = `${inputField.value} isn't a valid city name`
    }
    else {
        const city = info.name
        const country = info.sys.country
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main
        const { gust, speed } = info.wind

        if (id == 800) {
            weatherIcon.src = "images/sun.png"
        } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "images/storm.png"
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "images/snowy.png"
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = "images/hazy.png"
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "images/partly-cloudy.png"
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            weatherIcon.src = "images/rainy.png"
        }

        container.querySelector(".temp .numb").innerText = Math.floor(temp)
        container.querySelector(".weather").innerText = description
        container.querySelector(".location span").innerText = `${city}, ${country}`
        container.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        container.querySelector(".humidity span").innerText = `${humidity}%`
        container.querySelector(".wind span").innerText = Math.floor(gust + speed)

        infoText.classList.remove("pending", "error")
        container.classList.add("active")
        console.log(info)
    }
}

backFeature.addEventListener("click", () => {
    container.classList.remove("active")
})