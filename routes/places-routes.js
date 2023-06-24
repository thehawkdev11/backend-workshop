const express = require("express");


const router = express.Router();

const HttpError = require('../models/http-error');

const placesControllers = require('../controllers/places-controllers');



router.get('/:pid',placesControllers.getPlaceById);

router.get("/user/:uid",placesControllers.getPlacesByUserId);

router.post('/',placesControllers.createPlace);

router.patch('/:pid',placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace);

module.exports = router