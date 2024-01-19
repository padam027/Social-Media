const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error, success } = require('../utils/responseWrapper');
const ms = require('ms');



// Register Api

const registerController = async (req, res) =>{

    try{
        const {email, password, phone, name} = req.body;


        if(!email ){
            return res.send(error(401, 'Email is required'));
            
        }

        if(!password){
            return res.send(error(401, 'Password is required'));
        }

        if(!phone){
            return res.send(error(401, 'Phone number is required'));
        }

        if(!name){
            return res.send(error(401, 'Name is required'));
        }

        // check for existing user with the same email
        const userExist =  await User.findOne({email});
        if(userExist){
            return res.send(error(409, 'user is already registered'));
        }

        // hashing password
        const hashedPassword =  await bcrypt.hash(password,12);


        // storing the data of user 

        const user = await User.create({
             email,
            password: hashedPassword,
            name,
            phone,
        
        }) 

        return res.send(success(201, {
           message:'Successfully Registered',
           
        
        }));

        
    }

    catch (e){
        return res.send(error(500, e.message));

    }

        
};



// Login Api

const loginController = async (req, res) =>{

    try{
        const {email, password} = req.body;

        if(!email){
            return res.send(error(401, 'Email is required'));
        }

        if(!password){
            return res.send(error(401, 'Password is required'));
        }

        const user = await User.findOne({ email }).select('+password');



        if(!user){
            return res.send(error(404, 'User is not Registered'));
        }

          

        const matched = await bcrypt.compare(password, user.password);


     if(!matched){
        return res.send(error(403, 'Incorrect Password'));
        }




// generate access token 

        const accessToken = createAccessToken({id:user._id});

// generate refresh token 

        const refreshToken = createRefreshToken ({id:user._id});

 
 res.cookie('jwt', refreshToken,{
    httpOnly : true,
    secure: true
 });
       
 return res.send(success(201, {
   message: 'Successfully Login', 
   accessToken,
   
 }));


    }

    catch(e){
        return res.send(error(500, e.message));
    }
    

       

};


 // Api for checking validtion of refreshtoken and generate new accesstoken

 const refreshAccessTokenController= async (req, res) =>{

    // set cookies
    const  cookies = req.cookies

    if(!cookies.jwt) {
        return res.send(error(401,'Refresh Token in cookie is required'));
    }

    const refreshToken = cookies.jwt

    try{
        const decodeRefreshToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);

    const _id= decodeRefreshToken.id;

        const accessToken = createAccessToken({_id});
 return res.send(success(201, { 
            message:"Successfully AcessToken Generated",
            accessToken
        }));
        


     } catch(err){
        console.log(e);
        return res.send(error(403, 'Invalid  Refresh Token'));
     }
    };


// initial jsonwebtoken function for acess token

 const createAccessToken = (data) =>{
    try{
        let tokenData =jwt.sign(data, process.env.SECRET_ACCESS_KEY,{


            expiresIn:ms("15m")
        });
        
        return tokenData;
    }
    catch(e){
     return res.send(error(500, e.message));
    }
 };


//  create function for  refresh token 


const createRefreshToken = (data) =>{
try{
let tokenData =jwt.sign(data, process.env.SECRET_REFRESH_KEY,{
    
    expiresIn: ms("1y")
});

return tokenData;
}
catch(err){
    return res.send(error(500, e.message));
}
};



const logoutController = async (req, res) =>{
try{

    res.clearCookie('jwt', {
        httpOnly:true,
        sameSite:true

    });

    return res.send(success(200, "User successfully Logout"));


}
catch(e) {
    return res.send(error(500, e.message));
}
      
}



module.exports = {
    registerController,
    loginController,
    refreshAccessTokenController,
    logoutController

}

