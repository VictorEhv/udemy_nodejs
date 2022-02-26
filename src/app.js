const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//paths
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//---- config ----

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

// ---- routes ----
// root
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: "Victor Mayr"
    })
})

// about
app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: "Victor Mayr"
    })
})

// about
app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        message: "Help message to be shown on the help-page",
        name: "Victor Mayr"
    })
})

// weather
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "An address must be provided."
        })
    }
//----
    geocode(req.query.address, (error, {latitude, longitude, request_location, found_location} = {}) => {
        if(error){
            return res.send({
                error
            })

        }

        forecast(latitude, longitude, (error,responseFC) => {
            if(error){
                return res.send({
                    error
                })
            }

            return res.send({
                request_location,
                found_location,
                responseFC
            })
        })
    })
//----
/*    res.send({
        location: req.query.address,
    }) */
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: 'Help',
        message: 'Help article not found',
        name: 'Victor Mayr'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Victor Mayr'
    })
})

// Start server
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
