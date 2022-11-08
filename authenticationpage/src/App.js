import './App.css';
import React ,{useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { getToken ,setUserSession,removeUserSession} from './Components/Common';
import axios from 'axios';


function App() {
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`https://28eb-103-141-51-42.in.ngrok.io`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(true);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<PrivateRoute authLoading={authLoading}/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
