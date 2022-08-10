import './style/App.css';
import Auth from './pages/Auth.jsx'
import { useEffect, useState } from 'react';
import { APILibrary } from './API/APILibrary';
import Loader from './components/UI/Loader';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cabinet from './pages/Cabinet';
import Services from './pages/Services';
import Wrapper from './components/Wrapper';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import { CircularProgress } from '@mui/material';



function App() {
  
  const [isAuth, setIsAuth] = useState(null);

  const [API, setAPILibraryRequestData] = useState({
    Client: new APILibrary(setIsAuth)
  });

  const logOut = () => {
    alert('logout')
    localStorage.removeItem('token');
    localStorage.removeItem('Account');
    localStorage.removeItem('Email');
    setIsAuth(false);
}


  return (
    <div className="App">
    {
      isAuth === null 
          ? <CircularProgress/>
          : <BrowserRouter>
              <Routes>
              <Route path="/" element={<Wrapper logOut={logOut} isAuth={isAuth}/>} >
                {
                  !isAuth
                  ?  <>
                    <Route path="/auth" element={<Auth API={API} setIsAuth={setIsAuth} />} />
                    <Route path="*" element={<Navigate to="/auth" replace={true} />} />
                  </>
                  : <> 
                      <Route path="*" element={<Navigate to="/pagenotfound" replace={true} />}/>  
                      <Route path="/pagenotfound" element={<PageNotFound/>}/>  
                      <Route index path="/" element={<Home/>} />
                      <Route path="/cabinet" element={<Cabinet API={API} />} />
                      <Route path="/services" element={<Services API={API} />} />
                  </> 
                    
                }
              </Route>
                
              </Routes>
            </BrowserRouter>
    }
    </div>
  );


}

export default App;


/*

return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Wrapper/>} >
        {
          !isAuth
          ?  <>
             <Route path="*" element={<Navigate to="/auth" replace={true} />} />
             <Route path="/auth" element={<Auth API={API} setIsAuth={setIsAuth} />} />
          </>
          : <> 
              <Route path="*" element={<Navigate to="/pagenotfound" replace={true} />}/>  
              <Route path="/pagenotfound" element={<PageNotFound/>}/>  
              <Route index path="/" element={<Home/>} />
              <Route path="/cabinet" element={<Cabinet/>} />
              <Route path="/services" element={<Services/>} />
          </> 
             
        }
      </Route>
        
      </Routes>
    </BrowserRouter>
     {
     
      </div>
      );
*/