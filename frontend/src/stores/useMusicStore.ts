import { axiosInstance } from '@/lib/axios';
import type { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface MusicStore {
    albums: Song[];
    songs: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;


    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (songId: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],
    stats: {
        totalAlbums: 0,
        totalSongs: 0,
        totalUsers: 0,
        totalArtists: 0
    },

    deleteSong: async (songId) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${songId}`);
            set(state => ({
                songs: state.songs.filter(song => song._id !== songId),
                stats: {
                    ...state.stats,
                    totalSongs: state.stats.totalSongs > 0 ? state.stats.totalSongs - 1 : 0
                }
            }))
            toast.success('Song deleted successfully');
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
            toast.error(`Error Deleting Song: ${errorMessage}`);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) => (
                    song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
                )),
            }))
            toast.success('Song deleted successfully');
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
            toast.error(`Error Deleting Song: ${errorMessage}`);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs');
            // console.log(response.data);
            set({ songs: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/stats');
            // console.log(response.data);
            set({ stats: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/albums');
            // console.log(response.data);
            set({ albums: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (albumId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`);
            // console.log(response.data);
            set({ currentAlbum: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/featured');
            set({ featuredSongs: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/made-for-you');
            set({ madeForYouSongs: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/trending');
            set({ trendingSongs: response.data });
        } catch (error: unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    }
}
));

export default useMusicStore
