const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const accessTokens = [];
const refreshTokens = [];

const genAccessToken = (user) => {

    return new Promise((resolve, reject) => {
        if (user._id) {
            const token = jwt.sign({ _id: user._id, mobileNumber: user.mobileNumber }, process.env.JWT_AUTH_SECRET, {
                expiresIn: "1d",
            });
            accessTokens.push(token);
            resolve(token);
        } else {
            reject(createHttpError[500]);
        }
    });
};

const genRefreshToken = ({ _id }) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ _id: _id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                reject(createHttpError[500]);
            } else {
                refreshTokens.push(token);
                resolve(token);
            }
        }
        );
    });
};

const generateTokens = (mobileNumber) => {
    const xsrfToken = Math.random().toString(36).slice(2);
    const secretToken = jwt.sign({ mobileNumber, xsrfToken }, process.env.XSRFTOKEN_SECRET, { expiresIn: "1h" });

    accessTokens.push(secretToken);

    return { secretToken, xsrfToken };
};

module.exports = { genAccessToken, genRefreshToken, generateTokens };
