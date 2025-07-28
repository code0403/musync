export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    duration: string;
    imageUrl: string;
    audioUrl: string;
    releaseYear: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
    createdAt: string;
}

export interface Stats {
    totalAlbums: number;
    totalSongs: number;
    totalUsers: number;
    totalArtists: number;
}

export interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}