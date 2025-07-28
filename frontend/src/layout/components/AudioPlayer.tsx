import { usePlayerStore } from '@/stores/usePlayerstore';
import { useEffect, useRef } from 'react';

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore();

    // to handle play/pause logic
    useEffect(() => {
        console.log("isPlaying changed", isPlaying);
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);


    // handle Songs ends
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            console.log("song ended, play next song");
            playNext()
        }

        audio?.addEventListener("ended", handleEnded);

        return () => {
            audio?.removeEventListener("ended", handleEnded);
        }

    }, [playNext]);

    // handle song changes
    useEffect(() => {
        console.log("current song changed", currentSong);
        if (!audioRef.current || !currentSong) return;
        const audio = audioRef.current;

        // check if this is actually a new song
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

        if (isSongChange) {
            console.log("Setting audio src to", currentSong?.audioUrl);
            audio.src = currentSong?.audioUrl || "";

            // reset the playlist position
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;
            if (isPlaying) {
                audio.play().catch(e => console.error("Audio play error:", e));
            }
        }

    }, [currentSong, isPlaying]);


    return (
        <audio ref={audioRef} />
    )
}

export default AudioPlayer
