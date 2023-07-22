
const express = require('express');

const postController = require('../controllers/postController.js');

const timelineController = require('../controllers/timelineController.js');

const profileController = require('../controllers/profileController.js');

const app = express();

app.get('/favicon.ico', timelineController.getFavicon);

app.get('/', timelineController.getTimeline);

app.get('/:username', profileController.getProfile);

app.get('/:username/:postID', postController.getPostPage);

app.get('/error', profileController.getError);

module.exports = app;