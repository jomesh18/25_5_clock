import { useEffect, useRef, useState } from "react";

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (timeLeft === 0 && audioRef.current) audioRef.current.play();
  }, [timeLeft]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            const newSession = !isWorkSession;
            setIsWorkSession(newSession);
            return newSession ? sessionLength * 60 : breakLength * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, breakLength, sessionLength, isWorkSession]);

  const startStopTimer = () => {
    if (isRunning) setIsRunning(false);
    else setIsRunning(true);
  };

  const onReset = () => {
    setIsWorkSession(true);
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins > 9 ? mins : "0" + mins}:${secs > 9 ? secs : "0" + secs}`;
  };

  const onSessionIncrement = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isWorkSession) setTimeLeft(timeLeft + 60);
    }
  };

  const onBreakIncrement = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (!isWorkSession) setTimeLeft(timeLeft + 60);
    }
  };

  const onSessionDecrement = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isWorkSession) setTimeLeft(timeLeft - 60);
    }
  };

  const onBreakDecrement = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
      if (!isWorkSession) setTimeLeft(timeLeft - 60);
    }
  };

  return (
    <div id="container">
      <div>
        <h1>25 + 5 Clock</h1>
        <audio
          id="beep"
          ref={audioRef}
          src="/sounds/t-rex-roar.mp3"
          preload="auto"
        />
        <div id="break-label">Break Length</div>
        <div id="break-length">{breakLength}</div>
        <button id="break-decrement" onClick={onBreakDecrement}>
          Break decrement
        </button>
        <button id="break-increment" onClick={onBreakIncrement}>
          Break increment
        </button>

        <div id="session-label">Session Length</div>
        <div id="session-length">{sessionLength}</div>
        <button id="session-decrement" onClick={onSessionDecrement}>
          Session decrement
        </button>
        <button id="session-increment" onClick={onSessionIncrement}>
          Session increment
        </button>

        <div id="timer-label">{isWorkSession ? "Session" : "Break"}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <button id="start_stop" onClick={startStopTimer}>
          Start/Stop
        </button>
        <button id="reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
