import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { getToken, removeUserSession, setUserSession } from './Components/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`https://1a0d-103-141-51-42.in.ngrok.io/api/v1/login/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
  
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/Login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/Profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
