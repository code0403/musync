import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage';
import AuthCallback from './pages/auth-callback/AuthCallback';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/chat/ChatPage';
import AlbumPage from './pages/album/AlbumPage';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallback />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
