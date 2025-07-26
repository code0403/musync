import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in the getAllSongs Controller`, error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipline;
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
            _id : 1,
            title : 1,
            artist : 1,
            imageUrl : 1,
            audioUrl : 1
        },
      },
    ]);

    res.status(201).json(songs);
  } catch (error) {
    console.log(`Error in the getFeaturedSongs`, error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipline;
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
            _id : 1,
            title : 1,
            artist : 1,
            imageUrl : 1,
            audioUrl : 1
        },
      },
    ]);

    res.status(201).json(songs);
  } catch (error) {
    console.log(`Error in the getMadeForYouSongs`, error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipline;
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
            _id : 1,
            title : 1,
            artist : 1,
            imageUrl : 1,
            audioUrl : 1
        },
      },
    ]);

    res.status(201).json(songs);
  } catch (error) {
    console.log(`Error in the getTrendingSongs`, error);
    next(error);
  }
};
