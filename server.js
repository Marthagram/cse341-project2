import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/models/connect.js';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import router from './src/routes/index.js';
import { Strategy as GitHubStrategy } from 'passport-github2';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// 1. BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS - MUST be before session, and fix origin
app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

// DELETE your second CORS header block - cors() already handles it!

// 3. SESSION - use process.env
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

// 4. PASSPORT STRATEGY - FIXED SYNTAX
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/github/callback` // matches your farmRouter
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Access Token:', accessToken);
      console.log('GitHub Profile:', profile.username);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined ? ` Logged in as ${req.session.user.displayName}` : `Logged Out`
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs'
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// 5. DB AND ROUTES
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
