import './App.css';
import React ,{useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { getToken} from './Components/Common';


function App() {
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthLoading(true);
    }
  },[])
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
