
const Post = require("../Models/Post");
const User = require("../Models/User");
const mapPostOutput = require("../utils/Utils");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;



const createPostController = async (req, res) => {
    try {
        const { caption, postImg } = req.body;
        const owner = req._id;

        if(!caption && !postImg){
            return res.send(error(403, "Caption and PostImg are required"));
        }

    
  const cloudImg = await cloudinary.uploader.upload(postImg,{
                folder: 'postImg',  // The name of the directory in Cloudinary to upload the image to.
        
        });


        const user = await User.findById(owner);

        if(!user) {
            return res.send(error(404, 'User not found'));
        }

        const post = await Post.create({
            owner,
            caption,
            image:{
                publicId: cloudImg.public_id,
                url:cloudImg.url
            }, 
        });

        if(!post){
            return res.send(error(400, 'Post not created'));
        }

        user.posts.push(post);
        await user.save();
         

    return res.send(success(201, { post }));

    } catch (e) {

       return  res.send(error(500, e.message));
    }
};


const LikeUnlikeController = async (req,res) =>{


    try{
        const currentId = req._id;
        const {postId} = req.body;
        const post =  await Post.findById(postId).populate('owner');

   
        if(!post) {
           return res.send(error(404, "Post is not found"));
   
        }

        if(post.likes?.includes(currentId)){
            const index = post.likes.indexOf(currentId);
           post.likes.splice(index, 1);
          
        } else{
                post.likes.push(currentId)
        
        }
        await post.save();
        return res.send(success(200, {post:mapPostOutput(post, req._id) }));
   
    } catch(e){
  console.log("post", e)
        return res.send(error(500, e.message));

    }


     
}

const updatePostController = async (req, res) =>{

    try{
        const{postId, caption} = req.body;
        const curUserId = req._id;
   
        const post = await Post.findById(postId);
   
        if(!post){
           return res.send(error(404, " Post is not found"));
        }

        if(post.owner.toString() !== curUserId){
            return res.send(error(403, "Only owner can update the post"));
        }

        if(caption){
            post.caption = caption;
        }

        await post.save();
        return res.send(success(200, {post}));


   
    } catch(e){
        console.log("post", e)
        return res.send(error(500, e.message));
    }
}


const deletePostController = async (req, res) =>{

    try{


    const postdel= req.body.postId
    const curUserId = req._id;

    const post = await Post.findById(postdel);
    const curUser = await User.findById(curUserId);
   
    if(!post){
       return res.send(error(404, " Post is not found"));
    }

    if(post.owner.toString() !== curUserId){
        return res.send(error(403, "Only owner can delete the post"));
    }



  const index = curUser.posts.indexOf(postdel);
  curUser.posts.splice(index,1);
await curUser.save();
await Post.deleteOne();

return res.send(success(201, "successfully, post is deleted"));
}

 catch(e){
    return res.send(error(500, e.message));
 }


    }

module.exports ={
    createPostController,
    LikeUnlikeController,
    updatePostController,
    deletePostController
}