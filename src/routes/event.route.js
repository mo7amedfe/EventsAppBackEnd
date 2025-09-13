const express = require('express');
const router = express.Router();
const eventController = require('./../controllers/event.controller');
const eventImageUpload = require('./../midllewares/eventImageUpload');
const authorize = require('./../midllewares/authorize.middleware');

router.post("/",authorize("admin","moderator","organizer") ,eventImageUpload.single('image'),eventController.createEvent);
router.delete("/:id",authorize("admin","moderator","organizer"),eventController.deleteEvent);

router.get("/",authorize("admin","moderator","organizer","user"),eventController.getAllEvents);
router.get("/:id",authorize("admin","moderator","organizer","user"),eventController.getEventById);

// for Admin and moderator

router.put("/admin-moderator/:id/approve",authorize("admin","moderator"),eventController.giveDecision)

module.exports=router;