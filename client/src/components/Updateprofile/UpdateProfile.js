import React, { useEffect, useState } from 'react'
import './Updatepro.scss'
import { useDispatch, useSelector } from 'react-redux';
import { showToast, upadateMyProfile } from '../../redux/Slices/appConfigSlice';
import { axiosClient } from '../../Utils/axiosClient';
import { KEY__ACCESS_TOKEN, removeItem } from '../../Utils/localstroreManager';
import { TOAST_SUCCESS } from '../../App';


function UpdateProfile() {

    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

     const [name, setName] = useState('');
     const [bio, setBio] = useState('');
     const [profileImage, setProfileImage] = useState('');
     const [gender, setGender] = useState('');

      useEffect(()=>{
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setProfileImage(myProfile?.avatar.url || '');
        setGender(myProfile?.gender || '');

      },[myProfile]);


      function handleImageChange(e){

        const file = e.target.files[0];
 const fileReader = new FileReader();
 fileReader.readAsDataURL(file);
 fileReader.onload =() =>{

  if(fileReader.readyState === fileReader.DONE){
    setProfileImage(fileReader.result);
  }
 }

  }

   const dispatch = useDispatch();

      function handleSubmit(e){
        e.preventDefault();
        dispatch(upadateMyProfile({
          name,
          bio, 
          profileImage,
          gender
          

        }));

         dispatch(showToast({
           type: TOAST_SUCCESS,
           message: "Successfully Profile Updated"
         }))
      
      }
       
       

      async function handleDelete(){

         const response = await axiosClient.delete('/user/');
          console.log("response", response);
          
          removeItem(KEY__ACCESS_TOKEN);


  dispatch(showToast({
     type: TOAST_SUCCESS,
      message: "Successfully Deleted Your Account"
  }));
  


      }


  return (
    <div className='updatepro'>

        <div className="container">

            <div className="left">
            <div className="input-user-img">

            <label htmlFor="userImg" className='labelImg'><img src={profileImage}  alt={name} /></label>

<input type="file" accept='Image/*' className='inputImg' id='userImg' onChange={handleImageChange} />


            </div>


          </div>


            <div className="right">


                <form onSubmit={handleSubmit}>

 <input typeo='text' placeholder='Set Your Name' className='updateText' value={name} onChange={(e) => setName(e.target.value) } /> <br/> <br/>
 <input type='text' placeholder='Set Your Bio' className='updateText' value={bio}   onChange={(e) => setBio(e.target.value) }  /> <br/> <br/>
    <div className='gender'>

    <select  id='gender' value={gender} onChange={(e)=> setGender(e.target.value) }>
    <option value="Select Your Gender" >Select Your Gender</option>
       <option value="Male">Male</option>
       <option value="female">Female</option>
       <option value="Other">Other</option>
    </select>
    </div>
 <input type='Submit' value='Save' className='save-Btn submition' />


                </form>
                <button className='update-btn del-btn' onClick={handleDelete} >Delete Account</button>
            </div>
        </div>
        
        
        </div>
  )
}

export default UpdateProfile