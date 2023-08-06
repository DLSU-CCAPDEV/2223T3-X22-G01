
const express = require('express');

const loginController = require('../controllers/loginController.js');

const signupController = require('../controllers/signupController.js');

const timelineController = require('../controllers/timelineController.js');

const postController = require('../controllers/postController.js');

const profileController = require('../controllers/profileController.js');

const commentController = require('../controllers/commentController.js');

const logoutController = require('../controllers/logoutController.js');

const app = express();

// ROUTES

app.get('/favicon.ico', timelineController.getFavicon);

app.get('/', timelineController.getTimeline);

app.get('/signup', signupController.getSignUp);

app.post('/signup', signupController.postSignUp);

app.get('/login', loginController.getLogin);

app.post('/login', loginController.postLogin);

app.get('/logout', logoutController.getLogOut);

app.get('/home', timelineController.getTimeline);

app.post('/addPost', postController.insertPost);
app.post('/deletePost', postController.deletePost);
app.post('/editPost', postController.editPost);
app.post('/upvotePost', postController.upvotePost);
app.post('/downvotePost', postController.downvotePost);

app.post('/addComment', commentController.insertComment);
app.post('/deleteComment', commentController.deleteComment);
app.post('/editComment', commentController.editComment);
app.post('/upvoteComment', commentController.upvoteComment);
app.post('/downvoteComment', commentController.downvoteComment);

app.post('/editProfile', profileController.editProfile);

app.get('/:username', profileController.getProfile);
app.get('/:username/:postID', postController.getPost);




// ROUTES END

module.exports = app;