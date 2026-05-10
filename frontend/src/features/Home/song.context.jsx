import { createContext, useState } from "react";
export const songContext = createContext();

export function SongContextProvider({ children }) {
  const [songs, setSongs] = useState([
    {
      url: "https://ik.imagekit.io/xksricjlo/moodify/songs/Jump__Raag.Fm__eWHazGRDX.mp3",
      posterUrl:
        "https://ik.imagekit.io/xksricjlo/moodify/posters/Jump__Raag.Fm__oHSOtFj6H.jpeg",
      title: "Jump (Raag.Fm)",
      mood: "happy",
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <songContext.Provider value={{ songs, setSongs, loading, setLoading }}>
      {children}
    </songContext.Provider>
  );
}
