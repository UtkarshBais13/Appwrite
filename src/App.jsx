
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
 import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components';
//import Footer from './components/Footer/Footer'
function App() {
    
  const [loading,setloading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
     authService.getCurrentUser()
     .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
     })
     .finally(()=>setloading(false))
  },[])
 
  return !loading ? (
   <div className=' min-h-screen flex flex-wrap
   content-between bg-gray-200 w-full  '>
    <div className='w-full bloc'>
     <Header/>
     <main>
      <Outlet/>
     </main>
     <Footer/>
   </div>
   </div>
  ):null
}

export default App