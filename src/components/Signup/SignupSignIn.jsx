import React, { useState } from 'react'
import './SignupSignIn.css'
import Input from '../Input/Input'
import Button from '../Button/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth , db , provider } from '../../firebase';
import { doc, setDoc , getDoc} from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupSignIn = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [loding,setLoding] = useState(false);
    const [loginform,setLoginform] = useState(false);
    const navigate = useNavigate();

    const SignupEmail = () => {
      setLoding(true);
      if(name!="" && email!="" && password!="" && confirmpassword!= ""){
        if(password==confirmpassword){
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Signup Successful");
          setLoding(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmpassword("");    
          createDoc(user);
          navigate("/dashboard");
    })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoding(false);
    });
        }else{
          toast.error("Password and Confirm Password are not same");
          setLoding(false);
        }
      }
      else{
        toast.error("All fields are mandatory");
        setLoding(false);
      }
    }

    const SigninEmail = () => {
      setLoding(true);
      if( email!="" && password!="" ){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
      
        const user = userCredential.user;
        toast.success("Login Successful");
        setLoding(false);
        navigate("/dashboard");
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoding(false);
      toast.error(errorMessage);
    });
      }else{
        toast.error("All fields are mandatory");
        setLoding(false);
      }
  }
    
  const SigninGoogle = () => {
    setLoding(true);
    try{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    createDoc(user);
    navigate("/dashboard");
    setLoding(false);
    toast.success("Login Successful");
    
  }).catch((error) => {
    setLoding(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }
    catch(e){
      setLoding(false);
      toast.error(e.message);
      setLoding(false);
    }
  }
  
  async function createDoc(user){
    setLoding(true);
    if(!user) return;

    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);

    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid),{
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        } );
        setLoding(false);
      }
      catch(e){
        toast.error(e.message);
        setLoding(false);
      }
    }
    }

  return (
    <>
    {loginform?(<div className='signup-wrapper'>
      <h2 className='title'>Login on <span style={{color:"var(--theme)"}}>ExpenseEase.</span></h2>
      <form>
        <Input type="email" label={"EMAIL"} placeholder={"JhonDoe@gmail.com"} state={email} setState={setEmail}/>
        <Input type="password" label={"PASSWORD"} placeholder={"Example@123"} state={password} setState={setPassword}/>
        <Button text={loding?"Loading...":"Login Using Email and Password"} onClick={SigninEmail}/>
        <p className='or'>or</p>
        <Button text={loding?"Loading...":"Login Using Google"} blue={true} disabled={loding} onClick={SigninGoogle}/>
        <p className='or' style={{cursor:"pointer"}} onClick={()=>{setLoginform(!loginform)}}>Don't Have An Account? Click Here</p>
      </form>
    </div>):(<div className='signup-wrapper'>
      <h2 className='title'>Sign Up on <span style={{color:"var(--theme)"}}>ExpenseEase.</span></h2>
      <form>
        <Input label={"FULL NAME"} placeholder={"Jhon Doe"} state={name} setState={setName}/>
        <Input type="email" label={"EMAIL"} placeholder={"JhonDoe@gmail.com"} state={email} setState={setEmail}/>
        <Input type="password" label={"PASSWORD"} placeholder={"Example@123"} state={password} setState={setPassword}/>
        <Input type="password" label={"CONFIRM PASSWORD"} placeholder={"Example@123"} state={confirmpassword} setState={setConfirmpassword}/>
        <Button text={loding?"Loading...":"Signup Using Email and Password"} onClick={SignupEmail}/>
        <p className='or'>or</p>
        <Button text={loding?"Loading...":"Signup Using Google"} blue={true} disabled={loding} onClick={SigninGoogle}/>
        <p className='or' style={{cursor:"pointer"}} onClick={()=>{setLoginform(!loginform)}}>Or Have An Account Already? Click Here</p>
      </form>
    </div>)}
    
    </>
  )
}

export default SignupSignIn