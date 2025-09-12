const eventModel = require("../models/event.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createEvent = asyncHandler(async (req, res) => {
  const {  date, time, location, price,title,description } = req.body;

  const newEvent =await eventModel.create({
    organizer_id:req.user._id,
    date,
    time,
    location,
    imageUrl:req.file?.path,
    price,
    title,
    description
  });

  return res.status(200).json({ message: "success", event: newEvent });

});
