/*const express = require('express');

const controller = require('../controllers/controller.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

module.exports = app;

*/
const express = require('express');

const controller = require('../controllers/controller.js');

const postController = require('../controllers/postController.js');

const timelineController = require('../controllers/timelineController.js');

const profileController = require('../controllers/profileController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/');

// /*
//     execute function getSignUp()
//     defined in object `signupController` in `../controllers/signupController.js`
//     when a client sends an HTTP GET request for `/signup`
// */
// app.get('/signup', signupController.getSignUp);

// /*
//     execute function postSignUp()
//     defined in object `signupController` in `../controllers/signupController.js`
//     when a client sends an HTTP POST request for `/signup`
// */
// app.post('/signup', signupController.postSignUp);

// /*
//     execute function getSuccess()
//     defined in object `successController` in `../controllers/successController.js`
//     when a client sends an HTTP GET request for `/success`
// */
// app.get('/success', successController.getSuccess);

// /*
//     execute function getProfile()
//     defined in object `profileController` in `../controllers/profileController.js`
//     when a client sends an HTTP GET request for `/profile/:idNum`
//     where `idNum` is a parameter
// */
// app.get('/profile/:idNum', profileController.getProfile);

module.exports = app;