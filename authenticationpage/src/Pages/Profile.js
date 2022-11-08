import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeUserSession } from '../Components/Common';
import { SessionExpired } from '../Components/SessionExpired';



function Profile() {
  const navigate = useNavigate();
  const logoutbtn = () => {
    removeUserSession()
    navigate('/')
  }
  return (
    <div>
      <h1>Profile page</h1>
      <button className='btn btn-danger' onClick={logoutbtn}>Logout</button>
      <SessionExpired />
    </div>
  )
}

export default Profile