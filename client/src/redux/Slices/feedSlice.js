import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosClient} from '../../Utils/axiosClient';
import { postLikeUnlike } from "./postSlice";




export const getFeedData= createAsyncThunk('user/getFeedData', async () => {
    try {
    
      const response = await axiosClient.get('/user/getFeedData');
       return response.result;
    } catch (e) {
      return Promise.reject(e);
    } 
  });


  export const getFollowUnfollow= createAsyncThunk('user/follow-unfollow', async (body) => {
    try {
      
       const response = await axiosClient.post('/user/follow-unfollow', body);
       return response.result.user;


    } catch (e) {
      return Promise.reject(e);
    }
  });


   
  


const feedSlice = createSlice({
    name:"feedSlice",
    initialState :{
        feedData: {}
        
        
        },

   

 
    
       
        extraReducers: (builder) =>{
            builder.addCase(getFeedData.fulfilled, (state, action)=>{
  
              state.feedData= action.payload;
  
            }).addCase(postLikeUnlike.fulfilled, (state, action) =>{
  
              const post = action.payload;
              const index = state?.feedData?.posts?.findIndex(item => item._id === post._id);
               if(index !== undefined && index !== -1){
                state.feedData.posts[index] = post;
               } 
            })
            .addCase(getFollowUnfollow.fulfilled, (state, action) =>{
             const user = action.payload;
             const index = state?.feedData?.followings?.findIndex(item => item._id === user._id);

             if(index !==-1){
              state?.feedData.followings?.splice(index, 1);
             }else{
              state?.feedData?.followings?.push(user);
             }
            })
            
          }
  
       
  });
  


export default  feedSlice.reducer;
