import React from 'react'
import Header from '../components/Header/Header'
import SignupSignIn from '../components/Signup/SignupSignIn'

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignupSignIn/>
      </div>
    </div>
  )
}

export default Signup