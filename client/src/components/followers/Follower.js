/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowUnfollow } from '../../redux/Slices/feedSlice';
import { useNavigate } from 'react-router-dom';

function Follower({user}) {


  const navigate = useNavigate();
   const dispatch = useDispatch();
   const feedData = useSelector(state => state.feedDataReducer.feedData);
    const [isfollowing, setIsFollowing] = useState();


     useEffect(()=>{

      setIsFollowing(feedData.followings.find(item => item._id === user._id));
        
      
      
     },[feedData]);

      function handleFollowUnfollow(){
        dispatch(getFollowUnfollow({
          userIdToFollow: user._id
        }))
      }

      
  return (
    <div className='follower'>

<div className="user-info" onClick={() => navigate(`profile/${user._id}`)}>
<Avatar src={user?.avatar.url}/>
<h5 > {user?.name}</h5>

</div>


<button 
 onClick={handleFollowUnfollow}

className={isfollowing ?  "follow":  'following-btn'}>{isfollowing ? 'Unfollow': 'Follow'}


</button>


    </div>
  )
}

export default Follower