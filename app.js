require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./Routes/authRoute');
const connectDB = require("./Helper/mongo_init")


const app = express();

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
