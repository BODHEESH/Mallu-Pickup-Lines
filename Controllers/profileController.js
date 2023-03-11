
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');


// update user profile function
const updateProfile=async(req,res)=>{
      try{
        const { _id} = req.user
        let {username,mobileNumber,password,profilePictureName}=req.body
        let id=req.params.id
        if(id==_id){
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                let updateProfile=await User.updateOne(id,{
                    $set:{
                        username:username,
                        mobileNumber:mobileNumber,
                        password:hashedPassword,
                        profilePicture:profilePictureName
                    }
                })
               res.status(200).json({message:'suceesfully updated',updateProfile})
        }else{
            res.status(401).json({message:"unauthorized access"})
        }
      }catch(error){
        console.log(error,'update profile error');
      }
      
}


//follow user
const followUser=async(req,res)=>{
    try{
        const { _id} = req.user
        let id=req.params.id
        if(_id==id){
            let userId=req.body.userId
            if(id!==userId){
                 let user=await User.findOne({_id:id})
                 let currentUser=await User.findOne({_id:userId})
                 if(!user.followers.includes(userId)){
                    await user.updateOne({$push:{followers:userId}})
                    await currentUser.updateOne({$push:{followings:id}})
                    return res.status(200).json({ message: "user has been followed" });
                 }else{
                    return res
                    .status(403)
                    .json({ message: "you already follow this user" });
                 }
            }else{
                return res.status(403).json({ message: "you can't follow yourself" });
            }
            
        }else{
            res.status(401).json({message:"unauthorized access"})
        }

    }catch(error){
        console.log(error,'follow user');
    }
}

const unFollowUser=async(req,res)=>{
    console.log(req.user,'=========');
    console.log(req.params.id,'++++++++++');
    console.log(req.body,'req.body');
    try{
        const { _id} = req.user
        let id=req.params.id
        if(_id==id){
            let userId=req.body.userId
            if(id!==userId){
                 let user=await User.findOne({_id:id})
                 let currentUser=await User.findOne({_id:userId})
                 if(user.followers.includes(userId)){
                    await user.updateOne({$pull:{followers:userId}})
                    await currentUser.updateOne({$pull:{followings:id}})
                    console.log('success');
                    return res.status(200).json({ message: "user has been unFollowed" });
                 }else{
                    return res
                    .status(403)
                    .json({ message: "you already unfollow this user" });
                 }
            }else{
                return res.status(403).json({ message: "you can't follow yourself" });
            }
            
        }else{
            res.status(401).json({message:"unauthorized access"})
        }

    }catch(error){
        console.log(error,'follow user');
    }
}


module.exports={
    updateProfile,
    followUser,
    unFollowUser
}