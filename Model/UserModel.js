const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      trim: true,
      maxlength: 25,
   },
   mobileNumber: {
      type: Number,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true
   },
   profilePicture: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now()
   },
   status: {
      type: String,
      default: "active"
   },
   followers: {
      type: Array,
      default: []
   },
   followings: {
      type: Array,
      default: []
   },
   isAdmin: {
      type: Boolean,
      default: false,
   }
}, {
   timestamps: true
})


module.exports = mongoose.model('user', userSchema)