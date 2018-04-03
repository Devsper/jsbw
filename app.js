var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');

var config = require('./config/database');
var decks = require('./controllers/decks');
var register = require('./controllers/register');
var login = require('./controllers/login');
var logout = require('./controllers/logout');


mongoose.connect(config.database);
mongoose.Promise = global.Promise;

let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected on port " + port);
});

// Initiate app variable
const app = express();
// Server port
const port = 5500;

//Use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

//Middleware for CORS***
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding***
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.***
 We are telling express server public folder is the place to look for the static files***
*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res) {
    res.send("Base app");
});

app.use('/decks', decks);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);


app.listen(port, function(){

}); 