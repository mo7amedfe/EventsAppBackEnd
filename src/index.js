const express = require('express');
const connectDB = require('./../config/db');
const dotenv = require('dotenv');
dotenv.config();
const errorsMW = require('./midllewares/errors.middleware');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/user', require('./routes/user.route'));
app.use('/event', require('./routes/event.route'));
app.use('/cart', require('./routes/cart.route'));  


app.use(errorsMW)

connectDB()

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);

});


module.exports = app;
