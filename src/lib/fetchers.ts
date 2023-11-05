import { MusicRecord } from "../store/playerStore";
import { axiosInstance } from "./axios-instance";

export const fetchAllSongs = async () => {
  try {
    const response = await axiosInstance.get("/api/data/all_songs");
    const { all_songs } = response.data;
    return all_songs;
  } catch (error) {
    throw new Error("Error fetching documents");
  }
};

export const fetchSong = async () => {
  try {
    const response = await axiosInstance.get("/api/data/random_song");
    const { random_song } = response.data;
    const song = {
      ...random_song[0],
      creator: "Echelon",
    };
    return song
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

