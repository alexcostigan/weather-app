const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const app = express();


const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', viewsPath);




    
app.get('/', (req, res) => {

    res.render('index')
})

app.post('/api/weather', (req, res) => {
    console.log(res.body);

    const city = req.body.city

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=76fa3d4536090399bbae4fdb3797e391`
    console.log(weatherUrl)


    request({url: weatherUrl, json: true}, (error, response) => {
        console.log(response.body)
       
        res.render('index', {
            temp: response.body.main.temp,
            city: req.body.city,
            country: response.body.sys.country,
            weather: response.body.weather[0].description,
            // icon: response.body.weather[0].icon + ".png"
        })
    })

    

})

app.listen(5050, () => {
    console.log('Server is running')
})