const dotenv = require(`dotenv`);
const fs = require(`fs`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);
const routes = require('./routes/routes.js');
const connect = require('./models/db.js')
const mongoose = require(`mongoose`);

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

connect.connect();

app.set(`view engine`, `hbs`);

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended: true}));

app.use(express.static(`public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(`/`, routes);

app.use(function (req, res) {
    res.send(`Page not found`);
});

mongoose.connection.once('open' , () => {
    console.log('connected to salaminDB');
        app.listen(port, hostname, () => {
        console.log(`Server running at:`);
        console.log(`http://` + hostname + `:` + port);
    });
}) 

