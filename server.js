const express = require('express');
const passport = require('passport');

const cookieSession = require('cookie-session');
require('./passport');

const app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "pug");

const port = 5000

const isLoggedIn = (req, res, next) => {
  if (req.user)
    next();
  else
    res.render("index", { title: "Google Authentication", data: null });
}

app.get("/", isLoggedIn , (req, res) => {
  console.table(req.user._json);
  res.render("index", { title: "Google Authentication", data: req.user._json });
})

app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] } ));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/')
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.listen(port, () => console.log("server running on port" + port))
