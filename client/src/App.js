
import { Routes, Route } from 'react-router-dom';
import Notfound from './pages/notfound/Notfound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Homepage from './pages/Home/Homepage';
import ProtectRoute from './routes/ProtectRoute';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/Updateprofile/UpdateProfile';
import LoadingBar from 'react-top-loading-bar';
import {useSelector} from "react-redux"
import { useEffect, useRef } from 'react';
import PublicRoute from './routes/PublicRoute';
import toast, {Toaster} from 'react-hot-toast'



export const TOAST_SUCCESS = ' toast_sucess'
export const TOAST_FAILURE = 'toast_failure'
function App() {

 const isloading = useSelector(state =>   state.appConfigReducer.isloading);
 const loadingRef = useRef(null);
 const toastData = useSelector(state => state.appConfigReducer.toastData);

 


 useEffect(()=>{
 if(isloading){
   loadingRef.current?.continuousStart();

 }else{
   loadingRef.current?.complete();
 }
  

 }, [isloading])



 useEffect(()=>{
  switch (toastData?.type) {
    case TOAST_SUCCESS:
      toast.success(toastData?.message);
      
      break;
      case TOAST_FAILURE:
      toast.error(toastData?.message);

      break;
      
  
    default:

  }
   
 
  }, [toastData])



  return (
    <div className="App">

<LoadingBar color='#00ffee' ref={loadingRef}/>
  <div><Toaster/></div>
      <Routes  >
        <Route element={<ProtectRoute />}> 
        <Route  element={<Homepage />}>
        <Route path="/" element={<Feed />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        </Route>
        </Route>

        
       <Route element={<PublicRoute />}  >
 <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>

      
    <Route path="*" element={<Notfound />} />
      </Routes>

      
    </div>
  );
}

export default App;
