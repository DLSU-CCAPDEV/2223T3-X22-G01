const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const session = require(`express-session`);
const MongoStore = require('connect-mongo');
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
const routes = require('./routes/routes.js');
const db = require('./models/db.js')
const mongoose = require(`mongoose`);
const path = require(`path`);

const app = express();

dotenv.config();
port = process.env.PORT;
// hostname = process.env.HOSTNAME;

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set(`view engine`, `hbs`);

app.use(express.urlencoded({extended: true}));

app.use(express.static(`public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    // store: new MongoStore({mongooseConnection: process.env.MONGODB_URI})
    store: MongoStore.create({mongoUrl : process.env.MONGODB_URI})
}));

app.use(`/`, routes);

app.use(function (req, res) {
    var error = {
        collectionType: "page",
        route: "/"
    }
    res.render('error', error);
});

app.listen(port, () => {
    db.connect();
    console.log(`Server running at `);
    console.log(`port ` + port);
});
