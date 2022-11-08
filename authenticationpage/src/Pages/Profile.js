import React from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { removeUserSession } from '../Components/Common';
import { SessionExpired } from '../Components/SessionExpired';

import card_img from '../images/team2.jpg';


function Profile() {
  const navigate = useNavigate();
  const logoutbtn = () => {
    removeUserSession()
    navigate('/')
  }
  return (
    <>
     <section className='w-100'>
      <div class="container-fluid bg-dark " >
       
          <div class="row">
            <div class="col-sm-3"></div>
          <div class="col-sm-6"><h1>Profile Page</h1></div>
          <div class="col-sm-3 text-end"><button className='btn btn-danger mt-2 align-items-end' onClick={logoutbtn}>Logout</button></div>
       </div>
        
      <SessionExpired />
    </div>
    <div class="row container-fluid">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
    <div class="about-section">
    <h4>About Us Page</h4>
    <p>Some text about who we are and what we do.</p>
    <p>Resize the browser window to see that this page is responsive by the way.</p>
  </div>
  
  <h2 style={{textAlign:"center"}}>Our Team</h2>

      <div class="card">
     <img src={card_img} alt='hi' class="w-100" />
        <div class="container">
          <h2>Jane Doe</h2>
          <p class="title">CEO & Founder</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>jane@example.com</p>
          <p><button class="button btn btn-success">Contact</button></p>
        </div>
      </div>
    </div>
    </div>

    </section> 
    </>
  )
}

export default Profile