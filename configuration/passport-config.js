/*
* Set up with a help from passport's documentation,
*/

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load the Account's template
const Account = require('../account/Account');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'There is something wrong with your password...' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      // Check if the user exists
      Account.findOne({
        email: email
      }).then(acc => {
        if (!acc) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // If the account was found, try to match password
        // Use bcrypt again to decode the password(de-hash it)
        bcrypt.compare(password, acc.password, (error, found) => {
          if (error) throw error;
          if (found) {
            return done(null, acc);
          } else {
            return done(null, false, { message: 'There is something wrong with your password...' });
          }
        });
      });
    })
  );
  
  passport.serializeUser(function(acc, done) {
    done(null, acc.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(error, acc) {
      done(error, acc);
    });
  });
};