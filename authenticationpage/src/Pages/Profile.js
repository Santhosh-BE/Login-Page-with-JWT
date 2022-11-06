import React from 'react'
import {useNavigate} from 'react-router-dom'


function Profile() {
    const navigate = useNavigate();
    const logoutbtn=()=>{
       
            navigate('/login')
        }
  return (
    <div>
        <h1>Profile page</h1>
    <button className='btn btn-danger' onClick={logoutbtn}>Logout</button>
    </div>
  )
}

export default Profile