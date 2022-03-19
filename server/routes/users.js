const express = require('express');
const { nameCont ,postSignupController} = require('../controllers/userController');
const routes = express.Router();

routes.get('/name',nameCont);
//localhost:5000/api/signup

routes.post('/signup',postSignupController)
module.exports = routes