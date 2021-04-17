const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();
const punkAPI = new PunkAPIWrapper();
let beers = punkAPI

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/beers', (req, res, next) => {
  
  res.render('beers', {title: 'beers'})

})

app.get('/random-beers', (req, res, next) => {
  res.render('random', {title: 'random'})
})

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {title: 'home'});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
