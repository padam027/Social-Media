import React, { useState } from 'react'
import "./CreatePost.scss";
import Avatar from '../avatar/Avatar';
import { MdAddAPhoto } from "react-icons/md";
import { axiosClient } from '../../Utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/Slices/postSlice';



function CreatePost() {
  const userProfile = useSelector(state => state.postsReducer.userProfile);
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

     const [postImg, setPostImg] = useState(null);
     const [caption, setCaption] = useState('');
     const dispatch = useDispatch();

      function handleImageChange(e){


        const file = e.target.files[0];
 const fileReader = new FileReader();
 fileReader.readAsDataURL(file);
 fileReader.onload =() =>{

  if(fileReader.readyState === fileReader.DONE){
    setPostImg(fileReader.result);
  }
 }
}

  const handlePostSubmit =async () =>{

     try{
        
        await axiosClient.post('/post/createPost', {
          caption,
            postImg
        })
      
        dispatch(getUserProfile(
          {userId: myProfile?._id}
        ));
      
     } catch (e){
        console.log("Error in Post", e);
     } finally{

        setCaption('');
        setPostImg('');
     }
    

 }

      
  return (
    <div className='createPost'>
      <h1 className='h4-h4'>Create a New Post</h1>

       <div className="container">

       <div className="left-part">
<Avatar src={userProfile?.avatar?.url}/>
         </div>

 <div className="right-part">


<input type='text' className='captionInp' placeholder= "What's On Your Mind" value={caption}  onChange={(e) => setCaption(e.target.value)}/>


{postImg && (
  <div className='imgContainer'>
    <img src={postImg} alt='postimg' className='post-img' />
  </div>
)}

 <div className="input-user-img">

<label htmlFor="userImg" className='labelImg'> <MdAddAPhoto /> </label>
<input type="file" accept='Image/*' className='inputImg' id='userImg' onChange={handleImageChange} />
<button className='following-btn post-btn' onClick={handlePostSubmit} >Post</button>
</div>
 
   
         </div>
        
        </div>   

        </div>
  )
}

export default CreatePost