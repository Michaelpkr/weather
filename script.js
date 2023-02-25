const getIP = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '546d9fd64cmsh7ac2c56f489b45bp1219ebjsn41770e405e62',
            'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
    };
    
    let ip = await fetch('https://ip-geo-location.p.rapidapi.com/ip/check?format=json', options)
        .then(response => response.json())
        .then(response => {
        const location = response.city.name
        const latitude = response.location.latitude
        const longitude = response.location.longitude
        getWeather(latitude, longitude, location)
        })
        .catch(err => console.error(err));
}
getIP()

const getWeather = async (latitude, longitude, location) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '546d9fd64cmsh7ac2c56f489b45bp1219ebjsn41770e405e62',
            'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
        }
    };
    
   let weatherData = await fetch(`https://dark-sky.p.rapidapi.com/${latitude},${longitude}?units=auto&lang=en`, options)
        .then(response => response.json())
        .then(response => {
            const weatherData = response
            showWeather(weatherData, location)
        })
        .catch(err => console.error(err));

}

const showWeather = (weatherData, location) => {
    console.log(weatherData)
    const tempArea = document.getElementById("temp")
    const minTempArea = document.getElementById("min-temp")
    const maxTempArea = document.getElementById("max-temp")
    const currentLocationArea = document.getElementById("city-name")
    const summaryArea = document.getElementById("weather-type")
    const maxTemp = weatherData.daily.data[0].temperatureHigh
    const minTemp = weatherData.daily.data[0].temperatureLow
    const currentTemp = weatherData.currently.temperature
    const summary = weatherData.currently.summary
    const locationData = location
    tempArea.innerText = currentTemp
    minTempArea.innerText = minTemp
    maxTempArea.innerText = maxTemp
    currentLocationArea.innerText = locationData
    summaryArea.innerText = summary
}