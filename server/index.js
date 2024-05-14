'use strict';

const PORT = 3001;

const express = require('express');
const cors = require('cors');
const dao = require('./planes-dao');
const user_dao = require('./user-dao')
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local'); // username and password for login
const session = require('express-session'); // enable sessions


// init express
const app = new express();
const port = 3001;
app.use(express.json());
//app.use(cors());
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: 'afsdsafdscsf', resave: false, saveUninitialized: false
}));

passport.use(new LocalStrategy((username, password, callback) => {
  // verify function
  user_dao.getUser(username, password).then((user) => {
    callback(null, user);
  }).catch((err) => {
    callback(null, false, err)
  });
}));

passport.serializeUser((user, callback) => {
  callback(null, { id: user.id, email: user.email, name: user.name });
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

app.use(passport.authenticate('session'));

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("NOT AUTHENTICATED");
  }
}

//API
//app.use(isLogged);  // middleware installed for the APIs below this line

// POST /api/login

app.post('/api/login', function (req, res, next)  {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// POST /api/logout
app.post('/api/logout', (req, res) => {
  req.logout(() => { res.end() });
})

// const seats = [[["10A", "free"], ["5H", "occupied"], ["6J", "reserved"]]];
// const planes = ["Plane 1", "Plane 2", "Plane 3"];


app.get('/api/planes', (req, res) => {
  dao.listPlanes().then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.get('/api/seats/:idPlane', (req, res) => {
  dao.listSeats(req.params.idPlane).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.put('/api/submission', isLogged, async (req, res) => {
  try {
    const result = await dao.reserveSeats(req.user.id, req.body.plane, req.body.seats);

    if (result.error) {
      //if id doesn't exist
      res.status(404).json(result);
    }
    else
      res.json(result);
  } catch (err) {
    res.status(500).json(err).end();
  }
});

app.delete('/api/cancellation', isLogged, async (req, res) => {
  try {
    const result = await dao.cancelReservation(req.user.id, req.body.plane);

    if (result.error) {
      res.status(404).json(result);
    }
    else
      res.json(result);
  } catch (err) {
    res.status(500).json(err).end();
  }
});

app.listen(PORT,
  () => { console.log(`Server started on http://localhost:${PORT}/`) });