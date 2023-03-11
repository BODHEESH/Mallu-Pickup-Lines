const express=require('express')
const { updateProfile } = require('../Controllers/profileController')
const router=express.Router()
const { verifyJwt } = require("../middlewares/verifyJWT")

//update user profile router
router.post('/:id',verifyJwt,updateProfile)



module.exports=router