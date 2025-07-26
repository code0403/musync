import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import PlaylistSkeleton from '@/skeletons/PlaylistSkeleton'
import useMusicStore from '@/stores/useMusicStore'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageCircleIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router'

const LeftSidebar = () => {
    const { isLoading, songs, albums, fetchAlbums } = useMusicStore();

    useEffect(()=>{
        fetchAlbums()
    }, [fetchAlbums]);

    // console.log({songs, albums});
    return (
        <div className='h-full flex flex-col gap-2'>
            {/* Navigation Menu */}
            <div className='rounded-lg bg-zinc-900 p-4'>
                <div className='space-y-2'>
                    <Link to={"/"} className={cn(
                        buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800, "
                            })
                    )}>
                        <HomeIcon className='mr-2 size-5' />
                        <span className='hidden md:inline'>Home</span>
                    </Link>

                    <SignedIn>
                        <Link to={"/chat"} className={cn(
                            buttonVariants(
                                {
                                    variant: "ghost",
                                    className: "w-full justify-start text-white hover:bg-zinc-800, "
                                })
                        )}>
                            <MessageCircleIcon className='mr-2 size-5' />
                            <span className='hidden md:inline'>Messages</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>

            {/* Library section */}
            <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
                <div className='flex items justify-between mb-4'>
                    <div className='flex items-center text-white px-2'>
                        <Library className='size-5 mr-2' />
                        <span className='hidden md:inline'>Playlist</span>
                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-2'>
                        {
                            isLoading ? (
                                <PlaylistSkeleton />
                            ) : (
                                albums.map((album) => (
                                    <Link key={album._id} 
                                    to={`/albums/${album._id}`} 
                                    className={`p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer`}>
                                        <img src={album.imageUrl} alt='Playlist Image' className='w-12 h-12 rounded-md flex-shrink-0 object-cover' />
                                        <div className='flex-1 min-w-0 hidden md:block'>
                                            <p className='font-medium truncate'>{ album.title }</p>
                                            <p className='text-zinc-400 text-sm truncate'> Album . { album.artist }</p>
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar
