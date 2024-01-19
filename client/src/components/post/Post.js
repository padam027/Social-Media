import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import { FaRegHeart,  FaHeart} from "react-icons/fa";
import { useDispatch, useSelector,} from 'react-redux';
import {postLikeUnlike } from '../../redux/Slices/postSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/Slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';
import { axiosClient } from '../../Utils/axiosClient';

function Post({post}) {


  const navigate = useNavigate();
  const userProfile = useSelector(state => state.postsReducer.userProfile);
    
   const isSure = userProfile?._id === post.owner._id;

 const dispatch = useDispatch();

   function handlepostLikeunlike(){

    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:"Liked or Unliked Successfully"
     }));

     dispatch(postLikeUnlike(
      {
        postId: post._id
      }
     ));

    

   }

   async  function handlePostdel(){
   

        await  axiosClient.delete('/post/',{
           data:{
            postId: post._id 
           }
      
        });

        window.location.reload()
         
      
     }

   
    

  
  return (
    <div className='post'>

      <div className='heading' onClick={() => navigate(`profile/${post.owner._id}`)}>
       <Avatar src={post?.owner?.avatar?.url}/>
      <h3>{post?.owner?.name}</h3>
</div>
    <div className='content'>
      <img src={post?.image?.url} alt="post-imge" />
 </div>

 <div className='footer'>

  <div className="like" onClick={handlepostLikeunlike}>
  
    {post?.isLiked? < FaHeart className='icon2'/> : < FaRegHeart className='icon'/> }
  
  <h4>{`${post?.likesCount} Likes`}</h4>

  </div>
  <p className='caption'> {post?.caption}</p>
  <p className='time'>{post?.timeAgo }</p>

  {isSure && <button className='del-post' onClick={handlePostdel}>Delete Post</button>}






 </div>
   


    </div>
  )
}

export default Post