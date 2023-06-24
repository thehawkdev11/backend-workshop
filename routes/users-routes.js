const express = require("express");


const router = express.Router();

const HttpError = require('../models/http-error');

const usersControllers = require('../controllers/users-controllers');



router.get('/',usersControllers.getUsers);

router.post('/signup',usersControllers.signup);

router.post('/login',usersControllers.login);


module.exports = router;