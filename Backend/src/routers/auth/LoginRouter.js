const express = require('express')
const app = express.Router();
const  AuthService = require('../../services/auth/login')

app.get('/login',AuthService.Login);

module.exports = app;

