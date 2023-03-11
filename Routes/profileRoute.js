const express=require('express')
const { updateProfile, followUser, unFollowUser } = require('../Controllers/profileController')
const router=express.Router()
const { verifyJwt } = require("../middlewares/verifyJWT")

//update user profile router
router.post('/:id',verifyJwt,updateProfile)

//follow user router
router.put('/followUser/:id',verifyJwt,followUser)

//unfollow user router
router.put("/unfollowUser/:id",verifyJwt,unFollowUser)


module.exports=router