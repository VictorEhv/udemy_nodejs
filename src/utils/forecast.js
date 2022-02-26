const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dbac8f373da8ff4b6d40c65c9982b730&query=' + latitude + ',' + longitude

//    callback("saveWether forcast calls", undefined)
//    return

    const options = {
        url,
        json: true
    }

    request(options, (error,response) => {
        const {location, current} = response.body
        if(error){
            callback('Unknown network error, chekc internet connection', undefined)
        } else if (error){
            callback('Weather location not found', undefined)
        } else {
            callback(undefined, "In " + location.name + " it is now " + current.temperature + " degree. It feels like " + current.feelslike + " degree." )
        }
    })    
}

module.exports = forecast
