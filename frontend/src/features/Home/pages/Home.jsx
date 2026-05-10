import React from "react";
import { useSong } from "../hooks/useSong";

import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";

const Home = () => {
  const { handleGetSongs } = useSong();

  return (
    <main className="home-grid">
      <FaceExpression onMoodDetected={handleGetSongs} />
      <Player />
    </main>
  );
};

export default Home;
