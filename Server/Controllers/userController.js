const Post = require("../Models/Post");
const User = require("../Models/User");
const mapPostOutput = require("../utils/Utils");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;


const FollowUnfollowUserController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const currentId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(currentId);

    if (!curUser || !userToFollow) {
      return res.send(error(404, "User not found"));
    }

    // If user is already following, unfollow
    if (curUser.followings.includes(userIdToFollow)) {
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(currentId);
      userToFollow.followers.splice(followerIndex, 1);


    } else {
      // If user is not following, follow
      curUser.followings.push(userIdToFollow);
      userToFollow.followers.push(currentId);
    }

  await curUser.save();
  await userToFollow.save();

   return res.send(success(200, {user:userToFollow}));


  } catch (e) {
    return res.send(error(500, e.message));
  }
};



  const getpostFollowingUserController = async (req,res) =>{
 
    try
    {
      const currentId = req._id;

    const curUser = await User.findById(currentId).populate('followings');

    const fullPosts = await Post.find({
      'owner':{
        '$in':curUser.followings,
        
      }
    }).populate('owner');

     const posts = fullPosts.map(item => mapPostOutput(item, req._id)).reverse();
    
     const followingsUsers = curUser.followings.map(item => item._id);

const suggestions = await User.find({
  _id: {
    $nin: [...followingsUsers, currentId],
  },
});

     return res.send(success(200, {...curUser._doc, suggestions, posts}));

    } catch(e){
      return res.send(error(500, e.message));
    }


     };

const getmypostsController = async (req, res) =>{

      try{
        const curUserId = req._id;
      

      const curUser  = await User.findById(curUserId);
      if(!curUser){
        return res.send(error(404, "user is not found"));
      }

      const post = await Post.find({
        owner: curUserId
      }).populate("likes") // showing likes

       return res.send(success(200, {post}));

    
      } catch(e) {
        return res.send(error(500, e.message));
      }


     };

const  getUserPostsController = async (req, res) =>{

      try{
 const userId =req.body.userId;

 if(!userId){
  return res.send(error(400, "userId is required"));
 }

      const alluserPosts = await Post.find({
       owner: userId
      }).populate('likes')

       return res.send(success(200, {alluserPosts}));

    
      } catch(e) {
        return res.send(error(500, e.message));
      }

     };

     const deleteMyProfileController= async (req, res) =>{
      
      
      try{

       const curUserId = req._id;
       const curUser  = await User.findById(curUserId);

       // delete all posts

       await Post.deleteMany({
        owner:curUserId
       });


       // remove myself from followings followers

        curUser.followers.forEach(async(followerId )=> {

        const follower = await User.findById(followerId);
         const  index = follower.followings.indexOf(curUserId);
        follower.followings.splice(index, 1);
        await follower.save();

       });


       // remove myself from my following followers.

       curUser.followings.forEach(async(followingId) => {

        const following = await User.findById(followingId);
         const  index = following.followers.indexOf(curUserId);
        following.followers.splice(index, 1);
        await following.save();

       });


       // remove myself from likes

        const allPost = await Post.find(); 

        allPost.forEach(async(post)=>{
          const index = post.likes.indexOf(curUserId);
          post.likes.splice(index, 1);
          await post.save();
        });

        await curUser.deleteOne();
        res.clearCookie('jwt',{
          httpOnly:true,
          secure:true
        })

        return res.send(success(200, "Successfully deleted Your Profile"))


      }


      catch(e){
        return res.send(error(500, e.message));

      }
     }

     const getMyInfoContoller = async (req, res) => {
      try {

       const user = await User.findById(req._id);

        return res.json(success(200, { user }));
      } catch (e) {
        return res.send(error(500, e.message));
      }
    };



    const updateMyprofileController = async (req, res) =>{

      try{
        const {name, bio, profileImage, gender} = req.body;
       
      const user = await User.findById(req._id);

      if(name){
        user.name= name ;

      }
      if(bio){
        user.bio = bio;


      }
       if(gender){
         user.gender= gender
       }

      if(profileImage){

         const cloudImg = await cloudinary.uploader.upload(profileImage,{
          folder:"ProfileImg"
         });

         user.avatar = {
          url:cloudImg.secure_url,
          publicId: cloudImg.public_id
         }

      }
       await user.save();
       return res.send(success(200, {user}));
      
      } catch (e) {
        return res.send(error(500, e.message));
      }

    };


const getUserProfileController = async (req, res) =>{

 try{
  const userId= req.body.userId;

  

   const user = await User.findById(userId).populate({
    path: 'posts',

    populate:{
    path:'owner'
    }
   });


   const  fullPosts = user.posts;
   const posts = fullPosts.map(item => mapPostOutput(item, req._id)).reverse();

    
   return res.send(success(200, {...user._doc,posts}));




 }catch (e) {
  return res.send(error(500, e.message));
      }



     }
    

    


    module.exports = {
        FollowUnfollowUserController,
        getpostFollowingUserController,
        getmypostsController,
      getUserPostsController,
      deleteMyProfileController,
      getMyInfoContoller,
      updateMyprofileController,
      getUserProfileController

    }