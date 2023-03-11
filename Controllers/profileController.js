
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');


// update user profile function
const updateProfile=async(req,res)=>{
    console.log(req.user,'=========');
      console.log(req.params.id,'++++++++++');
      console.log(req.body,'req.body');
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
                console.log('sucess',updateProfile);
               res.status(200).json({message:'suceesfully updated',updateProfile})
        }else{
            res.status(401).json({message:"unauthorized access"})
        }
      }catch(error){
        console.log(error,'update profile error');
      }
      
}




module.exports={
    updateProfile,
}