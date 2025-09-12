module.exports = (err, req, res, next) => {
  if (err.errors) {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }

  return res.status(500).json({ message: err.message || "Internal Server Error" });
};
