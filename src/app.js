const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const log = console.log

const app = express()

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

//setup static directory
app.use(express.static(publicPath))

// setup handlebar engine and views paths
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jax'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jax'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jax',
        helpText: 'This is sample help text'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.location
    if (!address) {
        res.send({
            error: 'No location provided!!'
        })
    } else {
        geocode.getGeoCordinates(address, (error, { lattitube, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            const cordinates = lattitube + ',' + longitude
            weather.getWeather(cordinates, (error, { temperature, descriptions } = {}) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        location,
                        address,
                        temperature,
                        descriptions
                    })
                }
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: 'Help',
        name: 'Jax',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        title: 'Help',
        name: 'Jax',
        errorMsg: 'PAGE NOT FOUND'
    })
})

app.listen(3000, () => {
    log('server is up on 3000')
})