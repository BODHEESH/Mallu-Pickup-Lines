const createError = require("http-errors")
const jwt = require("jsonwebtoken")

const verifyJwt = (req, res, next) => {
    try {

        //checking if the cookies found in header
        if (!req.headers.cookie) {
            throw createError.NotFound("No cookies in header")
        }

        const cookies = req.headers.cookie.split(/[ =]+/)

        //checking cookies has the authToken
        if (!cookies.includes("jwtToken")) {
            throw createError.NotFound("No jwtToken in header")
        }

        //finding the index and accessing the authToken
        const index = cookies.indexOf("jwtToken")
        const token = cookies[index + 1]


        //checking cookies has the XSRF token math no
        if (!cookies.includes("XSRFTOKENMATHNO")) {
            throw createError.NotFound("No XSRF-TOKENMATHNO in header")
        }

        //finding the index and accessing the XSRF token math no
        const xsrfTokenMathNoIndex = cookies.indexOf("XSRFTOKENMATHNO")
        const xsrfTokenMathNo = cookies[xsrfTokenMathNoIndex + 1]

        const xsrfTokenMathNUMBER = xsrfTokenMathNo.replace(";", "");

        //checking cookies has the XSRF token
        if (!cookies.includes("XSRFTOKEN")) {
            throw createError.NotFound("No XSRF-TOKEN in header")
        }

        //finding the index and accessing the XSRF token
        const xsrfIndex = cookies.indexOf("XSRFTOKEN")
        const getxsrfToken = cookies[xsrfIndex + 1]

        const str = getxsrfToken
        const xsrfToken = str.replace(";", "");

        //verifying authToken with jwt
        jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, user) => {
            if (err) {
                throw createError.Unauthorized(err)
            }

            // Verify that the XSRF token matches the token stored in the JWT
            const xsrfTokenObj = { mobileNumber: user.mobileNumber, xsrfToken };

            const verifiedXsrfToken = jwt.verify(xsrfToken, process.env.XSRFTOKEN_SECRET);
            if (verifiedXsrfToken.xsrfToken !== xsrfTokenMathNUMBER) {
                throw createError.Unauthorized("Invalid XSRF token");
            }

            //putting that user to request header to access in the protected route
            req.user = user

            //go to next
            next()
        })

    } catch (error) {

        //if any thing goes wrong with the try block send errors to the client
        res.status(error.status || 500).json({ success: false, message: error.message || "Something went wrong" })
    }
}

module.exports = { verifyJwt } 
