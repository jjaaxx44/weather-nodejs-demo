
const request = require('postman-request');

const getGeoCordinates = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGV2b3dlIiwiYSI6ImNrb2wxaXR5MjBvZ2kydm8wczJrOWowNmYifQ.zT9M2Q9_1O75bAExFaLxJg&limit=1tps://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13728922#questions/9934404'

    request({ uri: geoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location", undefined)
        } else {
            const geoData = body.features[0]
            const data = { 
                lattitube: geoData.center[1],
                longitude: geoData.center[0],
                location: geoData.place_name
             }
            callback(undefined, data
            )
        }
    })
}

module.exports = {
    getGeoCordinates: getGeoCordinates
}