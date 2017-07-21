const express = require('express');
const app = express();
const passport = require('passport');
const passportSetup = require('./config/passport')(passport);
const session = require('express-session');
const flash = require('connect-flash');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/books');

app.use(bodyParser());
app.use(cookieParser());
app.set('view engine', 'ejs');

// setup sessions and passport
app.use(session({'secret' : 'eastnorthwest'}));
app.use(passportSetup.initialize());
app.use(passportSetup.session());
app.use(flash());

app.use('/books', bookRoutes);
app.use('/admin', adminRoutes)(passportSetup);

app.get('/', (req, res) => {
    res.send("BOOKSTORE");
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Listening on server");
})

module.exports = app;