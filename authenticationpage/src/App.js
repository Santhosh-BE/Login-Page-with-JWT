import './App.css';
import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
import { getToken} from './Components/Common';


function App() {
  const token=getToken();
  const [authLoading] = useState(token?true:false);

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
