import type { Song } from '@/types';
import { create } from 'zustand';
import { useChatStore } from './useChatstore';

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    intializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
};


export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    intializeQueue: (songs: Song[]) => {
        // console.log("Initializing queue with songs:", songs);
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        });
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];
        // console.log("playAlbum called. Setting currentSong to:", song);

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Listening to ${song.title} by ${song.artist}`
            })
        }

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        })
    },

    setCurrentSong: (song: Song | null) => {
        if (!song) return;

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Listening to ${song.title} by ${song.artist}`
            })
        }

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        // console.log("setCurrentSong called. Setting currentSong to:", song, "at index", songIndex);

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex === -1 ? songIndex : get().currentIndex,
        });
    },

    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        // console.log("togglePlay called. Will start playing:", willStartPlaying);

        const currentSong = get().currentSong;
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            if (willStartPlaying) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Listening to ${currentSong?.title} by ${currentSong?.artist}`
                })
            } else {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: "Idle"
                })
            }
        }

        // negate the current index to get the next song in the queue
        set({
            isPlaying: willStartPlaying,
        });
    },


    playNext: () => {
        const { currentIndex, queue } = get();
        const nextIndex = currentIndex + 1;
        // console.log("playNext called. Current index:", currentIndex, "Next index:", nextIndex);

        // if there is a next song to play, let's play it.
        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            // console.log("Playing next song:", nextSong);

            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Listening to ${nextSong.title} by ${nextSong.artist}`
                });
            }

            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true
            });
        } else {
            // console.log("End of queue reached. Stopping playback.");

            // if there is no next song, stop the player
            set({
                isPlaying: false,
                currentSong: null,
                currentIndex: -1
            });

            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                })
            }
        }

        // if we are at the end of the queue, go back to the start
        if (nextIndex >= queue.length) {
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Listening to ${queue[0].title} by ${queue[0].artist}`
                })
            }
            set({ currentIndex: 0 });
        } else {
            set({ currentIndex: nextIndex });
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                })
            }
        }
    },

    playPrevious: () => {
        const { currentIndex, queue } = get();
        const previousIndex = currentIndex - 1;
        // console.log("playPrevious called. Current index:", currentIndex, "Previous index:", previousIndex);

        // if there is a previous song to play, let's play it.
        if (previousIndex >= 0) {
            const previousSong = queue[previousIndex];
            // console.log("Playing previous song:", previousSong);

            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Listening to ${previousSong.title} by ${previousSong.artist}`
                });
            }

            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true
            });
        } else {
            // console.log("Start of queue reached. Stopping playback.");

            // if there is no previous song, stop the player
            set({
                isPlaying: false,
                currentSong: null,
                currentIndex: -1
            });

            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                })
            }
        }
    },

    // TODO: add a function to shuffle the queue
    // shuffleQueue: () => {},
    // TODO: add a function to repeat the current song
    // repeatCurrentSong: () => {},

    // TODO: add a function to repeat the queue
    // repeatQueue: () => {},

    // TODO: add a function to loop the queue
    // loopQueue: () => {},

    // TODO: add a function to loop the current song
    // loopCurrentSong: () => {},

    // TODO: add a function to shuffle the current song
    // shuffleCurrentSong: () => {},
}))