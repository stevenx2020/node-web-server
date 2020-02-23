const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// Settings
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Middlewares
app.use((req, res, next) => {
    let log = `${new Date().toString()} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (error) => {
        if(error) console.log(`${error}Unable to write to file server.log`);
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// Routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});