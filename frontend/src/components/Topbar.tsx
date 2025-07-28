import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'
import SignInOAuthButtons from './SignInOAuthButtons';
import { useAuthstore } from '@/stores/useAuthstore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Topbar = () => {
  const { isAdmin } = useAuthstore();
  // console.log({isAdmin});

  return (
    <div className='flex items-cnter justify-between p-4 sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-md'>
      <div className='flex gap-2 items-center'>
        <img src="/Musync-dark-logo.png" alt="logo" className='w-20 h-8' />
      </div>

      {/* TODO: Add search bar for songs, Albums, artist */}



      <div className='flex gap-4 items-center'>
        {isAdmin && (
          <Link to={"/admin"} className={cn(
            buttonVariants({ variant: 'outline' })
          )}>
            <LayoutDashboard className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}

        {/* <SignedIn>
            <SignOutButton>Sign Out</SignOutButton>
        </SignedIn> */}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  )
}

export default Topbar
