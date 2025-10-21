
const express = require('express');
const cors = require('cors');
const auth = require("./AuthRoutes");
const recipe = require("./RecipeRoutes");

const app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Or your React dev server
  credentials: true
}));

auth(app);
recipe(app);

// Start the server
module.exports = app;