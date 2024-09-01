import React, { useEffect } from 'react'
import './Header.css'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signOut } from "firebase/auth";
import userImg from '../../assets/user-regular.svg'

const Header = () => {
    const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      navigate('/dashboard')
    }
  },[user,loading])

  const Logoutfun = () => {
    try{
      signOut(auth).then(() => {
        toast.success("Logout Successful");
        navigate("/");
      }).catch((error) => {
        toast.error(error.message);
      });
    }catch(e){
      toast.error(e.message);
    }
  
  }
  return (
    <div className='navbar'>
      <p className='logo'>ExpenseEase.</p>
      {user &&(
      <div style={{display:"flex" , alignItems:"center" ,gap:"0.90rem"}}>
        <img src={user.photoURL ? user.photoURL : userImg} style={{borderRadius:"50%", height:"2rem" ,width:"2rem"}}/>
      <p onClick={Logoutfun} className='logo link'>Log out</p>
      </div>
      )}
    </div>
  )
}

export default Header