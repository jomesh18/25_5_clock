import { useState } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(sessionLength);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
  };

  return (
    <div id="container">
      <div>
        <h1>25 + 5 Clock</h1>
        <div id="break-label">Break Length</div>
        <div id="break-length">{breakLength}</div>
        <button
          id="break-decrement"
          onClick={() =>
            breakLength > 1 ? setBreakLength(breakLength - 1) : null
          }
        >
          Break decrement
        </button>
        <button
          id="break-increment"
          onClick={() =>
            breakLength < 60 ? setBreakLength(breakLength + 1) : null
          }
        >
          Break increment
        </button>

        <div id="session-label">Session Length</div>
        <div id="session-length">{sessionLength}</div>
        <button
          id="session-decrement"
          onClick={() =>
            sessionLength > 1 ? setSessionLength(sessionLength - 1) : null
          }
        >
          Session decrement
        </button>
        <button
          id="session-increment"
          onClick={() =>
            sessionLength < 60 ? setSessionLength(sessionLength + 1) : null
          }
        >
          Session increment
        </button>

        <div id="timer-label">Session</div>
        <div id="time-left">{time}</div>
        <button id="start_stop">Start/Stop</button>
        <button id="reset" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
