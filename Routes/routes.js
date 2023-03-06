// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// // GET route to get user profile
// router.get('/profile', (req, res) => {
//   // Verify the JWT token and the X-XSRF-TOKEN header
//   const token = req.cookies.jwt;
//   const xsrfToken = req.headers['x-xsrf-token'];
//   if (!token || !xsrfToken) {
//     return res.status(401).send('Unauthorized');
//   }

//   // Verify the JWT token and extract the user data
//   let userData;
//   try {
//     userData = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     return res.status(401).send('Unauthorized');
//   }

//   // Verify the X-XSRF-TOKEN header matches the token stored in the JWT
//   if (xsrfToken !== userData.xsrfToken) {
//     return res.status(401).send('Unauthorized');
//   }

//   // Send the user data in the response
//   res.send(userData);
// });

// // POST route to log in a user
// router.post('/login', (req, res) => {
//   // Check if the mobile number and password are valid
//   const mobileNumber = req.body.mobileNumber;
//   const password = req.body.password;
//   if (!mobileNumber || !password) {
//     return res.status(400).send('Invalid mobile number or password');
//   }

//   // Generate a JWT token and XSRF token
//   const xsrfToken = Math.random().toString(36).slice(2);
//   const token = jwt.sign({ mobileNumber, xsrfToken }, process.env.JWT_SECRET);

//   // Store the JWT token in a HttpOnly cookie and send the XSRF token in the response header
//   res.cookie('jwt', token, { httpOnly: true, secure: true });
//   res.set('X-XSRF-TOKEN', xsrfToken);

//   // Send a success response
//   res.send('Login successful');
// });

// // POST route to sign up a user
// router.post('/signup', (req, res) => {
//   // Check if the mobile number and password are valid
//   const mobileNumber = req.body.mobileNumber;
//   const password = req.body.password;
//   if (!mobileNumber || !password) {
//     return res.status(400).send('Invalid mobile number or password');
//   }

//   // Generate a JWT token and XSRF token
//   const xsrfToken = Math.random().toString(36).slice(2);
//   const token = jwt.sign({ mobileNumber, xsrfToken }, process.env.JWT_SECRET);

//   // Store the JWT token in a HttpOnly cookie and send the XSRF token in the response header
//   res.cookie('jwt', token, { httpOnly: true, secure: true });
//   res.set('X-XSRF-TOKEN', xsrfToken);

//   // Send a success response
//   res.send('Signup successful');
// });

// module.exports = router;
