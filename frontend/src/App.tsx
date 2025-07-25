import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage';
import AuthCallback from './pages/auth-callback/AuthCallback';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';


const App = () => {
  
  return (
    <>
    <Routes>
      <Route path='/' element = {<HomePage />} />
      <Route path='sso-callback' element = {<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path='/auth-callback' element = {<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App;
