const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmljdG9yMTk4MCIsImEiOiJja3p1ZW13Y3A2YWR6MnVvMXc3dXpjYzhhIn0.3pI32PW_6vFZb5CK0mDKmg&limit=1'

    const options = {
        url,
        json: true
    }

    request(options,(error, response) => {

        const {features} = response.body

        if(error){
            callback('Unknown network error, check internet connection', undefined)
        } else if (features.length === 0) {
            callback({
                request_location: address,
                Error: 'Location not found, please check query!'},
                undefined)
        } else {
            const {place_name, center} = features[0]
            callback(undefined, {
                request_location: address,
                found_location: place_name,
                longitude: center[0],
                latitude: center[1]
            })
        }

    })
}

module.exports = geocode