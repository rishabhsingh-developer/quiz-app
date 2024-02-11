import { useEffect } from "react";
import "../finish.css";

export default function Timer({ dispatch, clock }) {
  const min = Math.floor(clock / 60);
  const sec = clock % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "time" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <span className="timer">
      {min}:{sec}
    </span>
  );
}
