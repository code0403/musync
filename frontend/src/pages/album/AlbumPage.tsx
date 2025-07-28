import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMusicStore from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerstore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

const formatDuration = (duration: string) => {
    const durationInSeconds = parseInt(duration, 10);
    const minutes = Math.floor(durationInSeconds / 60);
    const Remainingseconds = durationInSeconds % 60;
    // return `${minutes}:${Remainingseconds < 10 ? '0' : ''}${Remainingseconds}`;
    return `${minutes}:${Remainingseconds.toString().padStart(2, '0')}`
}

// Start form here - 5:01:53

const AlbumPage = () => {
    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
    console.log(albumId);
    console.log(currentAlbum);

    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId);
    }, [fetchAlbumById, albumId]);

    if (isLoading) return null;

    const handlePlayAlbum = () => {
        if (!currentAlbum) return;

        const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);

        if (isCurrentAlbumPlaying) {
            togglePlay();
        } else {
            // start playing the Album from the beginning
            playAlbum(currentAlbum?.songs, 0);
        }
    }

    const handlePlaySong = (index: number) => {
        // console.log(index, currentAlbum, currentAlbum?.songs);
        if (!currentAlbum) return;
        playAlbum(currentAlbum?.songs, index);
    };


    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                {/* Main Content */}
                <div className="relative min-h-[800px]">
                    {/* bg gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900" aria-hidden="true">
                        <div className="relative z-10">
                            <div className="flex p-6 gap-6 pb-8">
                                <img
                                    src={currentAlbum?.imageUrl}
                                    alt={currentAlbum?.title}
                                    className="w-[240px] h-[240px] rounded shadow-xl"
                                />
                                <div className="flex flex-col justify-end">
                                    <p className="text-sm font-medium">Album</p>
                                    <h1 className="text-5xl font-bold my-4">{currentAlbum?.title}</h1>
                                    <div className="flex items-center gap-2 text-sm text-zinc-100">
                                        <span className="font-medium text-white">{currentAlbum?.artist}</span>
                                        <span className="text-zinc-400"> ◽ {currentAlbum?.songs?.length} Songs </span>
                                        <span className="text-zinc-400"> ◽ {currentAlbum?.releaseYear}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Play Button */}
                        <div className="px-6 pb-6 flex items-center gap-6">
                            <Button
                                onClick={() => handlePlayAlbum()}
                                size='icon'
                                className={`w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all`}
                            >
                                {
                                    isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                                        <Pause className='size-7 text-black' />
                                    ) : (
                                            <Play className="w-7 h-7 text-black" />
                                    )
                                }
                            </Button>
                        </div>


                        {/* Song List Table */}
                        <div className="bg-black/20 backdrop-blur-sm">
                            {/* table header */}
                            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white">
                                <div>#</div>
                                <div>Title</div>
                                <div>Released Year</div>
                                <div>
                                    <Clock className="h-4 w-4" />
                                </div>
                            </div>

                            {/* table body */}
                            {currentAlbum?.songs?.map((song, index) => {
                                const isCurrentSong = currentSong?._id === song._id;
                                return (
                                    <div
                                        key={song._id}
                                        onClick={() => handlePlaySong(index)}
                                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                                      text-zinc-400 hover:text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                                       `}
                                    >
                                        <div className="flex items-center justify-center">
                                            {isCurrentSong && isPlaying ? (
                                                <div className="size-4 text-green-500">🎵</div>
                                            ) : (
                                                <span className="group-hover:hidden">{index + 1}</span>
                                            )}
                                            {isPlaying && (
                                                <Play className="hidden group-hover:block h-4 w-4" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded-md" />


                                            <div>
                                                <div className={`font-medium text-white`}>{song.title}</div>
                                                <div>{song.artist}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                                        <div className="flex items-center">{formatDuration(song.duration)}</div>

                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>

        </div>
    )
}

export default AlbumPage;
