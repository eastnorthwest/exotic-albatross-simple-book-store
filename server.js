const express = require('express');
const app = express();
const passportSetup = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./routes/admin')(passportSetup);
const bookRoutes = require('./routes/books');

app.use(bodyParser());
app.use(cookieParser());
app.set('view engine', 'ejs');

// setup sessions and passport
app.use(session({'secret' : 'eastnorthwest', resave: false, saveUninitialized: false }));
app.use(passportSetup.initialize());
app.use(passportSetup.session());
app.use(flash());

app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);

app.use('/',express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send("BOOKSTORE");
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on server at " + port);
})

module.exports = app;