const express = require('express')
const app = express.Router();
const  AuthController = require('../../controllers/authController')

//secure login
app.post('/login',AuthController.login);

module.exports = app;

