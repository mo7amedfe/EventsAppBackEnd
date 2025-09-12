const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/event.controller');
const eventImageUpload = require('./../midllewares/eventImageUpload');
const authorize = require('./../midllewares/authorize.middleware');

router.post("/createEvent",authorize("admin","moderator","organizer") ,eventImageUpload.single('image'),eventController.createEvent);


module.exports=router;