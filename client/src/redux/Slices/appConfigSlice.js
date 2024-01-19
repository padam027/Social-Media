import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosClient} from '../../Utils/axiosClient';




export const getMyInfo = createAsyncThunk('user/getMyInfo', async () => {
    try {
      const response = await axiosClient.get('/user/getMyInfo');
    return  response.result.user
    } catch (e) {

      return Promise.reject(e);
    }
    
  });


   export const upadateMyProfile = createAsyncThunk("user/upadateMyProfile " , async (body) =>{

    try {
      
      const response = await axiosClient.put('/user/', body);
       console.log("update", response.result);
    return  response.result.user;
    } catch (e) {
   return Promise.reject(e);
    }

   });
  


   const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: {
      isloading: false,
      toastData: {},
      myProfile: null
    
    },
    reducers: {
      setLoading: (state, action) => {
        state.isloading = action.payload;
      },
      showToast: (state, action) => {
        state.toastData = action.payload;

    },

  },
    extraReducers: (builder) => {
      builder.addCase(getMyInfo.fulfilled, (state, action) => {
          state.myProfile = action.payload;


          
        })
        
      .addCase(upadateMyProfile.fulfilled, (state, action) => {
          state.myProfile = action.payload;
          
        })
    
      }
    
  });
  
  export default appConfigSlice.reducer;
  
  export const { setLoading, showToast } = appConfigSlice.actions;
  