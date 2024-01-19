import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosClient} from '../../Utils/axiosClient';





export const getUserProfile= createAsyncThunk('user/getUserProfile', async (body) => {
    try {
      
      const response = await axiosClient.post('/user/getUserProfile', body);
      return response.result;
    } catch (e) {
       return Promise.reject(e);
    } 
  });

  export const postLikeUnlike= createAsyncThunk('post/like-unlike', async (body) => {
    try {
      const response = await axiosClient.post('/post/like-unlike', body);
      return response.result.post;
    } catch (e) {
       return Promise.reject(e);
    } 
  });

 


const postSlice = createSlice({
    name:"postSlice",
    initialState :{
        userProfile:null
        
        },

   

 
    
        extraReducers: (builder) =>{
          builder.addCase(getUserProfile.fulfilled, (state, action)=>{

            state.userProfile= action.payload;

          }).addCase(postLikeUnlike.fulfilled, (state, action) =>{
             const post = action.payload;
            
            const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id);
             if(index !== undefined && index !== -1){
              state.userProfile.posts[index] = post;
             }
          })
          
          
        }

     
});


export default  postSlice.reducer;
