import { useState, useEffect } from "react";

function Tap({ setDelay }) {
  const [tapTime, setTapTime] = useState();
  const [timeArray, setTimeArray] = useState([]);
  const maxWait = 3000;

  function onMouseDown() {
    if (!tapTime) return setTapTime(Date.now());

    setTapTime(prevTime => {
      const difference = Date.now() - prevTime;
      difference > maxWait
        ? setTimeArray([])
        : setTimeArray(arr => [...arr, difference]);

      return Date.now();
    });
  }

  useEffect(() => {
    if (!timeArray.length) return;

    const sum = timeArray.reduce((acc, cur) => acc + cur);
    setDelay(sum / timeArray.length);
  }, [timeArray]);

  return (
    <div>
      <button onMouseDown={onMouseDown}>Tap Tempo</button>
    </div>
  );
}

export default Tap;
