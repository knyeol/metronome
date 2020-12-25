import { useState, useEffect } from "react";

function Accuracy({ delay, nextTime }) {
  const [timeDifference, setTimeDifference] = useState();
  const [delayMsg, setDelayMsg] = useState();
  const [emoji, setEmoji] = useState("😶");
  const maxDelay = 300;

  function getEmoji(score) {
    const emojis = {
      10: "😵",
      9: "😁",
      8: "😃",
      7: "😏",
      6: "😥",
      5: "😶",
      4: "😐",
      3: "😒",
      2: "😣",
      1: "😢",
      0: "😭"
    };
    setEmoji(emojis[score]);
  }

  function onMouseDown() {
    const tempTime = nextTime - Date.now();
    if (tempTime < 0) return setTimeDifference();
    const isLate = tempTime > delay / 2;
    setTimeDifference(Math.round(isLate ? delay - tempTime : tempTime));
    setDelayMsg("ms " + (isLate ? "late" : "early"));
  }

  useEffect(() => {
    if (!timeDifference) return;
    const delayRatio = timeDifference / maxDelay;
    const score = Math.round((1 - delayRatio) * 10);
    getEmoji(score < 0 ? 0 : score);
  }, [timeDifference]);

  return (
    <div>
      <div>
        <button className="accuracy-button" onMouseDown={onMouseDown}>
          <h1>{emoji}</h1>
          <h4>
            {timeDifference
              ? `${timeDifference} ${delayMsg}`
              : "Start metronome to enable"}
          </h4>
        </button>
      </div>
    </div>
  );
}

export default Accuracy;
