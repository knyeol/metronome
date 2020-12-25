import { useState, useEffect } from "react";

export default function Click({ delay, nextTime, setNextTime }) {
  const [clickTimeout, setClickTimeout] = useState();
  const [clickInterval, setClickInterval] = useState();
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const click = new Audio(
    "https://firebasestorage.googleapis.com/v0/b/metronome-adc80.appspot.com/o/click.wav?alt=media&token=1675b659-a78e-43b4-bd7e-a12f5477903b"
  );

  function clearClicks() {
    clickInterval && clearInterval(clickInterval);
    clickTimeout && clearTimeout(clickTimeout);
  }

  function playClick() {
    setNextTime(Date.now() + delay);
    click.volume = volume / 100;
    click.load();
    click.play();
  }

  function createInterval() {
    const cb = setInterval(() => playClick(), delay);
    clearClicks();
    playClick();
    setClickInterval(cb);
  }

  function createTimeout() {
    const interval = nextTime - Date.now();
    const cb = setTimeout(() => createInterval(), interval);
    clearClicks();
    setClickTimeout(cb);
  }

  useEffect(() => {
    if (isPlaying && Date.now() < nextTime) return createTimeout();
  }, [delay, volume]);

  useEffect(() => {
    if (!isPlaying) return clearClicks();
    createInterval();
  }, [isPlaying]);

  return (
    <div>
      <div className="slider-container">
        <span className="slider-text">🔊</span>
        <input
          className="slider"
          type="range"
          value={volume}
          onChange={e => setVolume(e.target.value)}
        />
      </div>
      <div>
        <button className="bpm-button" onClick={() => setIsPlaying(p => !p)}>
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}
