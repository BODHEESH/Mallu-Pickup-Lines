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
app.use("/api",require("./Routes/postRoute"))
app.use("/api/profile",require('./Routes/profileRoute'))

// Error handling middleware
app.use((err, req, res, next) => {
 res.status(err.status || 500)
 res.send({
  code:err.status || 500,
  message:err.message || "Something went wrong "
 })
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
