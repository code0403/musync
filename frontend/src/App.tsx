import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from './components/ui/button';

const App = () => {
  return (
    <div className='text-red-500'>
      <h1 className='text-5xl text-bolder'>Hello</h1>

      <Button variant={"destructive"}>This is a button from Schdn Ui</Button>


      <header>

        <SignedOut>
          <SignInButton>
            <Button variant={"default"}>SignIn</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

      </header>
    </div>
  )
}

export default App;
