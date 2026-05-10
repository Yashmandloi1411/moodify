import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "./Player.scss";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

function Player() {
  const { songs } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasSongs = Array.isArray(songs) && songs.length > 0;
  const activeSong = hasSongs ? songs[selectedIndex] || songs[0] : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setSelectedIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
  }, [activeSong?.url]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleSkip = (seconds) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;
    const nextTime = Math.min(
      Math.max(0, audio.currentTime + seconds),
      duration,
    );
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSpeedChange = (event) => {
    setPlaybackRate(Number(event.target.value));
  };

  const handleSelectSong = (index) => {
    setSelectedIndex(index);
    setIsPlaying(true);
  };

  return (
    <section className="music-player">
      <div className="music-player__hero">
        <div className="music-player__poster">
          <img
            src={activeSong?.posterUrl}
            alt={activeSong?.title || "Song poster"}
          />
        </div>

        <div className="music-player__details">
          <div className="music-player__meta">
            <span className="music-player__label">Now Playing</span>
            <h2>{activeSong?.title || "No song selected"}</h2>
            <p>{activeSong?.mood || "Mood unavailable"}</p>
          </div>

          <div className="music-player__controls">
            <div className="music-player__buttons">
              <button
                type="button"
                className="player-btn"
                onClick={() => handleSkip(-10)}
              >
                &#9664;&#9664; 10s
              </button>
              <button
                type="button"
                className="player-btn player-btn--primary"
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                className="player-btn"
                onClick={() => handleSkip(10)}
              >
                10s &#9654;&#9654;
              </button>
            </div>

            <div className="music-player__seek">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(event) => handleSeek(Number(event.target.value))}
              />
              <span>{formatTime(duration)}</span>
            </div>

            <div className="music-player__speed">
              <label htmlFor="speed">Speed</label>
              <select
                id="speed"
                value={playbackRate}
                onChange={handleSpeedChange}
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="music-player__card-row">
        {hasSongs ? (
          songs.map((song, index) => (
            <button
              type="button"
              key={`${song.title}-${index}`}
              className={`song-card ${index === selectedIndex ? "song-card--active" : ""}`}
              onClick={() => handleSelectSong(index)}
            >
              <img src={song.posterUrl} alt={song.title} />
              <div className="song-card__meta">
                <strong>{song.title}</strong>
                <span>{song.mood}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="music-player__empty">
            No recommended songs available yet.
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src={activeSong?.url}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
    </section>
  );
}

export default Player;
