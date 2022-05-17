// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

hbs.registerHelper("formatDate", (date)=>{
	const dayName = ["Monday", "Tuesday", "Wednesday", "Thursdasy", "Friday", "Saturday", "Sunday"]
	const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
	return `${dayName[date.getDay()]} ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`})

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);


// default value for title local
const projectName = 'YaPIC';
const capitalized = (string) =>
	string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} - Post Photos and Meet People`;


// 👇 Start handling routes here
const isLoggedIn = require('./middlewares/isLoggedIn'); 

const authRoutes = require('./routes/auth-routes'); 
app.use('/', authRoutes);

const privateRoutes = require('./routes/private-routes');
app.use('/', privateRoutes);

const index = require('./routes/index');
app.use('/', index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
