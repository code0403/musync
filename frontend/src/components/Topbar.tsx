import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'
import SignInOAuthButtons from './SignInOAuthButtons';

const Topbar = () => {
    const isAdmin = false;
  return (
    <div className='flex items-cnter justify-between p-4 sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-md'>
      <div className='flex gap-2 items-center'>Spotify</div>
      <div className='flex gap-4 items-center'>
        {isAdmin && (
            <Link to={"/admin"}>
                <LayoutDashboard className='size-4 mr-2' />
                Admin Dashboard
            </Link>
        )}

        <SignedIn>
            <SignOutButton>Sign Out</SignOutButton>
        </SignedIn>

        <SignedOut>
            <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  )
}

export default Topbar
