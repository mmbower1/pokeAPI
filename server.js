const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const path = require('path');
var PORT = process.env.PORT || 5000;
dotenv.config({ path: './config/config.env' });

// connect mongo
connectDB();

// dotenv
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  // load env vars. this goes before route files so api works
  dotenv.config({ path: './config/config.env' });
}

// heroku production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.heroku...']
const corsOptions = {
  origin: (origin, callback) => {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// bodyparser middleware, handles http requests
app.use(bodyParser.urlencoded({ extended: true }));

// init middleware
app.use(express.json({ extended: false }));

// cookie parser
app.use(cookieParser());

// access routes
app.use('/', require('./routes/homepage'));

// heroku 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(errorHandler);

app.get('/', (req, res) => res.send('pokeAPI API Running'));

console.log('');
app.listen(
  PORT, 
  () => console.log(`>>> pokeAPI Server started on port ${PORT}`.black.bold)
);