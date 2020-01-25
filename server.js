
const PORT = process.env.PORT || 5001;
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const bycrypt = require('bcryptjs');
const passport = require('passport');
const dotenv = require('dotenv').config();

app.engine('html', require('ejs').renderFile);
app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.urlencoded({ extended: false }));

// Database connection

//const database = require('./configuration/mongo_db').MongoURI;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
    })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// Initialise session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Middleware for passport
require('./configuration/passport-config')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Controllers
/* app.use('/', require('./routes/generic.js'));
app.use('/login', require('./routes/account.js'));
app.use('/register', require('./routes/account.js')); */


// Routes - I am placing them here as I believe the app is not big enoguh to create a separate file.

// Account's template
const Account_User = require('./account/Account');

// Check if valid access
const { checkAuthenticated, checkNotAuthenticated } = require('./configuration/checkIfLogged');

// Freerly accessible files
app.get('/', (req, res) => {
  res.render('index_no.ejs');
});

app.get('/about', checkAuthenticated, (req, res) => {
  res.render('about.ejs', { name: req.user.name });
});

app.get('/index', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

// Account-related files

// Login page
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

// Handle login requests
app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Register Page
app.get('/register', checkNotAuthenticated , (req, res) => {
  res.render('register.ejs');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body; 
  let errors = [];

  // check if the password is at least 6 characters long
  if(password.length < 6 ) {
    errors.push({ message: 'Please enter at least 6 characters.'});
  }

  if(errors.length > 0) {
    res.render('/register', {
      errors,
      name,
      email,
      password
    });
  } else {
  // Validation passed
    Account_User.findOne({ email: email }).then(user => {
        if(user) {

          // If user exists
          errors.push({ msg: 'This email is alredy taken' });
          res.render('/register', {
            errors,
            name,
            email,
            password
          });
        } else {
          const newAccount = new Account_User({
            name,
            email,
            password  
          });

          // Encrypt password
          bycrypt.genSalt(10, (error, salt) => 
            bycrypt.hash(newAccount.password, salt, (error, hash) => {
              if(error) throw error;

              // Set password to a hashed version of it
              newAccount.password = hash;
              // Save new account
              newAccount.save().then(user => {
                req.flash('success_msg', 'Registered. Please log in.');
                res.redirect('/login');
              }).catch(error => console.log(error));
            }));
        }
      });
    }
});



// Logout from the system
app.get('/logout', (req, res) => {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


app.get('*', function(req, res){
  res.render('invalid.ejs');
});

app.listen(PORT);
console.log(`Running on port: ${PORT}`);
