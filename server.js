// server.js

// load semua package
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var port         = process.env.PORT || 8080;

var configDB     = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // konek ke database

require('./config/passport')(passport);

// set up express
app.use(morgan('dev')); // log semua request ke console
app.use(cookieParser()); // untuk cookies (diperlukan untuk auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// diperlukan untuk passport
app.use(session({ secret: 'ganjarsetiasimpleloginexpresscool' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// route diatur dibawah ini
require('./app/routes.js')(app, passport); // ambil route, masukan app & passport

// RUN!
app.listen(port);
console.log('Aplikasi jalan di http://localhost: ' + port);
