import { getSongs } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
  const context = useContext(songContext);
  const { songs, setSongs, loading, setLoading } = context;

  async function handleGetSongs(mood) {
    setLoading(true);
    const data = await getSongs(mood);
    setSongs(data.songs || []);
    setLoading(false);
  }

  return {
    loading,
    songs,
    handleGetSongs,
  };
};
