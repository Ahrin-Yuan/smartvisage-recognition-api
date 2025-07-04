const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('./controllers/clarifai_api');


//bindi your HTTP server to the port defined by the PORT environment variable. refer : https://render.com/docs/web-services#port-binding
const port = process.env.PORT || 8000;

// DB Connection (with Knex library)
const db = knex({ 
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    //ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json()); // old way body-parser(for edu purposes)
app.use(cors()); // Allow cross-origin requests

app.get('/', (req,res) =>{
    res.send('Success!');
})

//app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})
//app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})
app.post('/imageurl', (req, res) => {
  try {
    const { input } = req.body;
    clarifai.handleApiCall(req, res, input);
  } catch (err) {
    console.error("Clarifai API error:", err);
    res
      .status(500)
      .json({ error: "Internal server error processing Clarifai request" });
  }
});

// Listen on port
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})