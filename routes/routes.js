
const express = require('express');

const indexController = require('../controllers/indexController.js');

const loginController = require('../controllers/loginController.js');

const signupController = require('../controllers/signupController.js');

const timelineController = require('../controllers/timelineController.js');

const postController = require('../controllers/postController.js');

const profileController = require('../controllers/profileController.js');

const commentController = require('../controllers/commentController.js');

const app = express();

// ROUTES

app.get('/favicon.ico', indexController.getFavicon);

app.get('/', indexController.getIndex);

app.get('/signup', signupController.getSignUp);

app.post('/signup', signupController.postSignUp);

app.get('/login', loginController.getLogin);

app.get('/home', timelineController.getTimeline);

app.post('/addPost', postController.insertPost);
app.post('/deletePost', postController.deletePost);
app.post('/editPost', postController.editPost);

app.post('/addComment', commentController.insertComment);
app.post('/deleteComment', commentController.deleteComment);
app.post('/editComment', commentController.editComment);

app.get('/:username', profileController.getProfile);
app.get('/:username/:postID', postController.getPost);


// ROUTES END

module.exports = app;