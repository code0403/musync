import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';
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


    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
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
        } catch (error: any) {
            set({ error: error.response.data.message || "Unknow error" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/made-for-you');
            set({ madeForYouSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message || "Unknow error" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/trending');
            set({ trendingSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message || "Unknow error" });
        } finally {
            set({ isLoading: false });
        }
    }
}
));

export default useMusicStore
