import "./App.css";
import { useState } from "react";
import Bpm from "./components/Bpm";
import Tap from "./components/Tap";
import Click from "./components/Click";
import Accuracy from "./components/Accuracy";

function App() {
  const [delay, setDelay] = useState(1000);
  const [nextTime, setNextTime] = useState();

  return (
    <div className="container">
      <h3>Metronome</h3>
      <p>
        Clapping to a metronome every day improves your timing,
        <small>&nbsp;some say&#8230;</small>
      </p>
      <Bpm delay={delay} setDelay={setDelay} />
      <Click delay={delay} nextTime={nextTime} setNextTime={setNextTime} />
      <Tap setDelay={setDelay} />
      <Accuracy delay={delay} nextTime={nextTime} />
    </div>
  );
}

export default App;
