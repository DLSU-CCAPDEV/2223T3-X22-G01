
const express = require('express');

const postController = require('../controllers/postController.js');

const timelineController = require('../controllers/timelineController.js');

const profileController = require('../controllers/profileController.js');

const successController = require('../controllers/successController.js');

const app = express();

app.get('/favicon.ico', timelineController.getFavicon);

app.get('/', timelineController.getTimeline);

app.get('/:username', profileController.getProfile);

app.get('/:username/:postID', postController.getPostPage);

app.get('/error', profileController.getError);

app.get('/login', timelineController.getLogin);

app.post('/login', timelineController.postLogin);

/*
    execute function getSignUp()
    defined in object `indexController` in `../controllers/indexController.js`
    when a client sends an HTTP GET request for `/signup`
*/
app.get('/signup', timelineController.getSignUp);

/*
    execute function postSignUp()
    defined in object `indexController` in `../controllers/indexController.js`
    when a client sends an HTTP POST request for `/signup`
*/
app.post('/signup', timelineController.postSignUp);

/*
    execute function getSuccess()
    defined in object `successController` in `../controllers/successController.js`
    when a client sends an HTTP GET request for `/success`
*/
app.get('/success', successController.getSuccess);

/*
    execute function getUsername()
    defined in object `timelineController` in `../controllers/timelineController.js`
    when a client sends an HTTP GET request for `/getCheckUsername`
*/
app.get('/getUsername', timelineController.getCheckUsername);






module.exports = app;