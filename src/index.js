const express = require('express');
const connectDB = require('./../config/db');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const cors = require('cors');
const errorsMW = require('./midllewares/errors.middleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', require('./routes/user.route'));
app.use('/event', require('./routes/event.route'));
app.use('/cart', require('./routes/cart.route'));

// Error middleware
app.use(errorsMW);

// Connect DB
connectDB().catch(err => console.error('MongoDB connection error:', err));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

// Local dev
if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}
