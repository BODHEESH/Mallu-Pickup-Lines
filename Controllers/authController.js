const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Model/UserModel');
const { genAccessToken, genRefreshToken, generateTokens } = require("../Helper/JWT");


/* -------------------------------------------------------------------------- */
/*                     GET controller to get user profile                     */
/* -------------------------------------------------------------------------- */

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user);
    // Get user ID and mobile number from the req.user object
    const { _id, mobileNumber } = req.user

    // Retrieve user profile data from the database using the ID and mobile number
    const user = await User.findOne({ _id: _id, mobileNumber })

    // Send the user information back to the client
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


/* -------------------------------------------------------------------------- */
/*                      POST controller to log in a user                      */
/* -------------------------------------------------------------------------- */


exports.login = async (req, res) => {
  console.log("login console")
  try {
    // Check if the mobile number and password are valid
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    if (!mobileNumber || !password) {
      throw new Error('Invalid mobile number or password');
    }

    // Find the user in the database
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      throw new Error('User not found. Please try again.');
    }

    // Compare the password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password. Please try again.');
    }
    //generate jwt and sent it to the client
    const authToken = await genAccessToken(user);
    const refreshToken = await genRefreshToken(user);
    const xsrfTokenObj = await generateTokens(mobileNumber)

    // Store the JWT token in a HttpOnly cookie and send the XSRF token in the response header
    res
      .cookie("jwtToken", authToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
      })
    res
      .cookie("XSRFTOKEN", xsrfTokenObj.secretToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
      })
    res
      .cookie("XSRFTOKENMATHNO", xsrfTokenObj.xsrfToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
      })

    // Send a success response
    res.json({ success: true, refreshToken, user, message: 'Signup successful' });
  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }
};



/* -------------------------------------------------------------------------- */
/*                      POST controller to sign up a user                     */
/* -------------------------------------------------------------------------- */

exports.signup = async (req, res) => {
  try {
    // Check if the mobile number and password are valid
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;
    if (!mobileNumber || !password) {
      throw res.status(400).send('Invalid mobile number or password');
    }

    const isExist = await User.findOne({ mobileNumber: mobileNumber })
    console.log(isExist, "is exist");
    if (isExist) {
      throw new Error("Mobile number already registered. Please login to your account")
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ mobileNumber, password: hashedPassword });

    // Save the new user to the database 
    await newUser.save()


    //generate jwt and sent it to the client
    const authToken = await genAccessToken(newUser);
    const refreshToken = await genRefreshToken(newUser);
    const xsrfTokenObj = await generateTokens(mobileNumber)


    console.log(authToken, "auth token")
    console.log(refreshToken, "refreshToken token")
    console.log(xsrfTokenObj, "xsrfToken token")

    // Store the JWT token in a HttpOnly cookie and send the XSRF token in the response header
    res.cookie('jwt', xsrfTokenObj.token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict' });

    // Log the response headers to ensure that the cookie is being sent correctly
    // console.log(res.getHeaders());
    res.set('X-XSRF-TOKEN', xsrfTokenObj.xsrfToken);

    // Send a success response
    res.json({ success: true, refreshToken, newUser, message: 'Signup successful' });
  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }

};


/* -------------------------------------------------------------------------- */
/*                     POST controller to logout in a user                    */
/* -------------------------------------------------------------------------- */

exports.logout = (req, res) => {
  res.status(200).json({ msg: "logout succesfully" })
}
