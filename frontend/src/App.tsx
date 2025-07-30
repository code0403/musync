import { Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage';
import AuthCallback from './pages/auth-callback/AuthCallback';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/chat/ChatPage';
import AlbumPage from './pages/album/AlbumPage';
import AdminPage from './pages/admin/AdminPage';
import { Toaster } from 'react-hot-toast';
import NotFoundPage from './pages/404/NotFoundPage';


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path='/auth-callback' element={<AuthCallback />} />
        <Route path='/admin' element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='*' element={<NotFoundPage />} />
          {/* create a route for creating playlist-> this will be used to create a playlist */}
          {/* On this page , there will be the top navbar for searching the songs adding in the playlist */}
          {/* In the main area there will different songs which can be added in the playlist */}
          {/* if sreach is used for an album search all the realted songs will be shown to be added in the playlist */}
          {/* serach will also work in the same way, just when create playlist is selected there will be a btn to create the name of the playlist */}
          {/* TODO: add an add to the playlist btn on each song when the playlist is created */}
        </Route>
      </Routes>

      {/* React Hot Toast */}
      <Toaster />
    </>
  )
}


export default App;
