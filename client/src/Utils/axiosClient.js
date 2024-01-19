 import axios from 'axios';
import { KEY__ACCESS_TOKEN, getItem, removeItem, setItem, } from './localstroreManager';
import store from '../redux/Store/store';
import { setLoading, showToast } from '../redux/Slices/appConfigSlice';
import { TOAST_FAILURE} from '../App';



export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL, // this is the main url for our server
    withCredentials:true  // this is for cookie
 });

  
 axiosClient.interceptors.request.use(
    (request) =>{
      const accessToken = getItem(KEY__ACCESS_TOKEN);
      request.headers["Authorization"] = `Bearer ${accessToken}`;

       store.dispatch(setLoading(true));


      return request;
   }
 )
 
 axiosClient.interceptors.response.use(
     async (response) =>{

      store.dispatch(setLoading(false));
      const data = response.data;
      if(data.status === 'Ok'){

         return data;
      }
      const originalRequest = response.config;
      const statusCode = data.statusCode;
      const error = data.message;
      
      // setting toast here

        store.dispatch(showToast({
            
          type: TOAST_FAILURE,
          message: error
        }))


      // if access is expired and call refresh api

      if(statusCode === 403 && !originalRequest.retry){
         originalRequest.retry = true;
 const response = await axios.create({
   withCredentials: true,
 }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
 

      

         if(response.data.status === 'Ok'){
            setItem(KEY__ACCESS_TOKEN, response.data.result.accessToken);
           originalRequest.headers["Authorization"] = `Bearer ${ response.data.result.accessToken}`
            return  axios(originalRequest);

         } else{
            removeItem(KEY__ACCESS_TOKEN);
            window.location.replace('/login', '_self');
            return Promise.reject(error);

         } 

      }
      return Promise.reject(error);

   
   }, async(error) => {
      store.dispatch(setLoading(false));
      store.dispatch(showToast({
            
         type: TOAST_FAILURE,
         message: error.message
       }))
       return Promise.reject(error);

   }
 ) 



 