const eventModel = require("../models/event.model");
const bookedEventModel = require("../models/bookedEvents.model");
const asyncHandler = require("../utils/asyncHandler");

exports.createEvent = asyncHandler(async (req, res) => {
  const { date, time, location, price, title, description } = req.body;

  const newEvent = await eventModel.create({
    organizer_id: req.user._id,
    date: date || null,
    time: time || "soon",
    location: location || "No Location Yet",
    imageUrl: req.file?.path,
    price: price || 0,
    title,
    description,
    status: "Pending",
  });

  return res.status(201).json({ message: "Event created", event: newEvent });
});

exports.getAllEvents = asyncHandler(async (req, res) => {
  let events;
  if (req.user.role === "admin" || req.user.role === "moderator") {
    events = await eventModel.find();
  } else {
    events = await eventModel.find({ status: "Approved" });
  }

  return res.status(200).json({ message: "success", events });
});

exports.getEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const event = await eventModel.findById(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (
    req.user.role !== "admin" &&
    req.user.role !== "moderator" &&
    event.status !== "Approved"
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  return res.status(200).json({ message: "success", event });
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  const organizerId = req.user._id;
  const eventId = req.params.id;

  const event = await eventModel.findById(eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (
    req.user.role === "organizer" &&
    !event.organizer_id.equals(organizerId)
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  await eventModel.findByIdAndDelete(eventId);

  return res.status(200).json({ message: "Event deleted successfully" });
});

exports.bookedEvents = asyncHandler(async (req, res) => {
  let events;
  if (req.user.role === "moderator" || req.user.role === "admin") {
    events = await bookedEventModel
      .find()
      .populate("event_id")
      .populate("user_id", " name email");
  }
  const userId = req.user._id;

  if (req.user.role === "organizer") {
    events = await bookedEventModel
      .find()
      .populate({
        path: "event_id",
        match: { organizer_id: userId },
      })
      .populate("user_id", "name email");
    events = events.filter((b) => b.event_id !== null);
  }
  if (req.user.role === "user") {
    events = await bookedEventModel
      .find({ user_id: userId })
      .populate("event_id");
  }
  return res.status(200).json({ message: "success", events });
});

// Admin/Moderator
exports.giveDecision = asyncHandler(async (req, res) => {
  const { decision, reason } = req.body;
  const eventId = req.params.id;

  const event = await eventModel.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (decision === "Declined" && !reason) {
    return res
      .status(400)
      .json({ message: "Reason is required for declining an event" });
  }

  if (!["Approved", "Declined"].includes(decision)) {
    return res.status(400).json({ message: "Invalid decision" });
  }

  const updatedEvent = await eventModel.findByIdAndUpdate(
    eventId,
    {
      status: decision,
      decision: {
        decisionedById: req.user._id,
        reason: reason || null,
        updatedAt: Date.now(),
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ message: `Event ${decision.toLowerCase()}`, event: updatedEvent });
});
