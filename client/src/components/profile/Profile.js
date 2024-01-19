/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import Post from '../post/Post'
import './Profile.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import { getUserProfile } from '../../redux/Slices/postSlice';
import { getFollowUnfollow } from '../../redux/Slices/feedSlice';



function Profile() {


  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.postsReducer.userProfile);
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  const [isMyprofile, setIsMyprofile] = useState(false);
  const [isfollowing, setIsFollowing] = useState(false);
   
   
 

 
 useEffect(()=>{

   dispatch(getUserProfile({

    userId:params.userId
  

   }));

   setIsMyprofile(myProfile?._id === params.userId);
   setIsFollowing(feedData?.followings?.find(item => item._id === params.userId));
  

}, [myProfile, params.userId, feedData]);

  const navigate = useNavigate();


   function handleFollowUnfollow(){
    dispatch(getFollowUnfollow({
      userIdToFollow: params.userId
    }))

   }
  return (
    <div className='profile'>

 <div className="container">

  <div className="above">

 {isMyprofile && <CreatePost /> }
<div className="post-Section">
{userProfile?.posts?.map(post => <Post key={post._id} post={post} />)}
</div>


   
 
</div>
    

<div className="below">

  <div className="profile">



  <div className="profile-pic">

<div className="left">

<div className="profile-img">
<img src={userProfile?.avatar?.url} alt='Imagepic' />
</div>
<h6>{userProfile?.name}</h6>
<p className='caption'>{userProfile?.bio}</p>

</div>

<div className="right">
<div className='follow'>{`${userProfile?.followers.length} Followers`}</div>
<div className="follow">{`${userProfile?.followings.length} Followings`}</div>

</div>



  
</div>

<div className='belowpart'>

   <h3 className='h3'>{userProfile?.gender}</h3>


  {!isMyprofile && (

<button 
 onClick={handleFollowUnfollow}

className={isfollowing ?  "follow btn-follow":  'following-btn btn-follow'}>{isfollowing ? 'Unfollow': 'Follow'}


</button>
  )}

  {isMyprofile && (


<button className='update-btn btn-follow' onClick={() => navigate("/updateprofile")}> Update Profile</button>

  )}

  </div>

  </div>


  
  


  </div>
  
 


 </div>



    </div>
  )
}

export default Profile