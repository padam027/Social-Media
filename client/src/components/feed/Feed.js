import React, { useEffect } from 'react';
import './Feed.scss'
import Post from '../post/Post';
import Follower from '../followers/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/Slices/feedSlice';

function Feed() {

   const dispatch = useDispatch();
   const feedData = useSelector(state => state.feedDataReducer.feedData);
   
     
  
    useEffect (()=>{
      dispatch(getFeedData());

    }, [dispatch]);
  return (
<div className='feed'>

<div className='container'>

<div className='leftpart'> 

{feedData?.posts?.map(post =>  <Post key={post._id} post={post}/>)}

 

</div>

<div className='rightpart'>

<div className="following">

<h4> You Are Following</h4>

{feedData?.followings?.map((user, index) => (
  <Follower key={`following_${user._id}_${index}`} user={user} />
))}

 
 
 <h4 className='suggestion'> Suggesste For You</h4>

 {feedData?.suggestions?.map((user, index) => (
  <Follower key={`suggestion_${user._id}_${index}`} user={user} />
))}



</div>
      


</div>

      



</div>
   



    </div>
  )
}

export default Feed