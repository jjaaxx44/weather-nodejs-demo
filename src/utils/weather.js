
const request = require('postman-request');

const url = 'http://api.weatherstack.com/current?access_key=47717b4f7fc884b00f31f97cc5275ff5&query='

const getWeather = (cordinates, callback) => {
    const apiUrl = url + cordinates
    request({ uri: apiUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find weather', undefined)
        } else {
            const currentWeather = body.current
            const weatherData = {
                temperature: currentWeather.temperature,
                descriptions: currentWeather.weather_descriptions[0],
                humidity: currentWeather.humidity
            }
            callback(undefined, weatherData)
        }
    })
}

module.exports = {
    getWeather: getWeather
}