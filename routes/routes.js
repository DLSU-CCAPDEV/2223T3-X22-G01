
const express = require('express');

const indexController = require('../controllers/indexController.js');

const loginController = require('../controllers/loginController.js');

const signupController = require('../controllers/signupController.js');

const timelineController = require('../controllers/timelineController.js');

const postController = require('../controllers/postController.js');

const profileController = require('../controllers/profileController.js');

const app = express();

// ROUTES

app.get('/favicon.ico', indexController.getFavicon);

app.get('/', indexController.getIndex);

app.get('/signup', signupController.getSignUp);

app.post('/signup', signupController.postSignUp);

app.get('/login', loginController.getLogin);

app.get('/home', timelineController.getTimeline);

app.get('/:username', profileController.getProfile);

// ROUTES END

module.exports = app;