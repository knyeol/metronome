import { useState, useEffect, useRef } from "react";

export default function Bpm({ delay, setDelay }) {
  const totalMs = 60000;
  const [bpm, setBpm] = useState(totalMs / delay);

  function roundValue(x) {
    return Math.round(x * 100) / 100;
  }

  function changedInput(e) {
    const newValue = roundValue(+e.target.value);
    const convertedValue = roundValue(totalMs / newValue);
    const targetClass = e.target.className;

    if (targetClass.includes("bpm")) {
      setBpm(newValue);
      setDelay(convertedValue);
    } else {
      setBpm(convertedValue);
      setDelay(newValue);
    }
  }

  useEffect(() => {
    setBpm(roundValue(totalMs / delay));
    localStorage.setItem("delay", delay);
  }, [delay]);

  return (
    <div>
      <div className="bpm-container">
        <input
          className="bpm bpm-input"
          type="number"
          value={bpm}
          onChange={e => changedInput(e)}
        />
        <label>BPM</label>
      </div>
      <div className="ms-container">
        <span>{Math.round(delay)}&nbsp;</span>
        <span>ms interval</span>
      </div>
      <div className="slider-container slider-bpm">
        <span className="slider-text">🐢</span>
        <input
          className="bpm slider"
          type="range"
          min="20"
          max="240"
          value={bpm}
          onChange={e => changedInput(e)}
        />
      </div>
    </div>
  );
}
