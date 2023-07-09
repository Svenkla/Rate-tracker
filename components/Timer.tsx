import { useEffect } from "react";

const Timer = ({ running, setRunning, timer, time, setTime }: any) => {
  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((pre: number) => pre + 1);
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [running]);

  const format = (time: number): string => {
    let hours: any = Math.floor((time / 60 / 60) % 24);
    let minutes: any = Math.floor((time / 60) % 60);
    let seconds: any = Math.floor(time % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <p>{format(time)}</p>
    </div>
  );
};

export default Timer;
