import { useEffect, useReducer } from "react";
import Navbar from "./Navbar";
import StartPage from "./StartPage";
import StartScreen from "./StartScreen";
import Finish from "./Finish";
import Error from "./Error";

const initialValue = {
  phase: "loading",
  arr: [],
  index: 0,
  answer: null,
  point: 0,
  maxpoint: 0,
  clock: 0,
  level: "easy",
  newArr: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "notstart":
      return {
        ...state,
        phase: "notstart",
        newArr: action.payload,
      };
    case "error":
      return {
        ...state,
        phase: "error",
      };
    case "option":
      return {
        ...state,
        level: action.payload,
      };
    case "start":
      return {
        ...state,
        arr:
          state.level === "easy"
            ? state.newArr.filter((item) => item.points === 10)
            : state.level === "hard"
            ? state.newArr.filter((item) => item.points === 30)
            : state.level === "All question"
            ? state.newArr
            : state.newArr.filter((item) => item.points === 20),
        phase: "start",
        clock: state.newArr.length * 30,
      };
    case "newAns":
      const currentindexans = state.arr[state.index];
      console.log(currentindexans.correctOption);

      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === currentindexans.correctOption
            ? state.point + currentindexans.points
            : state.point,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "time":
      return {
        ...state,
        clock: state.clock - 1,
        phase: state.clock === 0 ? "finish" : state.phase,
      };
    case "finish":
      return {
        ...state,
        phase: "finish",
        maxpoint: state.point > state.maxpoint ? state.point : state.maxpoint,
      };
    case "restart":
      return {
        ...state,
        phase: "notstart",
        index: 0,
        answer: null,
        point: 0,
      };

    default:
      throw new Error("invalid");
  }
}
function App() {
  const [{ phase, arr, index, answer, point, maxpoint, clock }, dispatch] =
    useReducer(reducer, initialValue);
  console.log(arr);

  const arrlength = arr.length;
  const totalpoints = arr.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "notstart", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="App">
      <Navbar />
      {phase === "loading" && <p>loading</p>}
      {phase === "error" && <Error />}
      {phase === "notstart" && <StartPage dispatch={dispatch} />}
      {phase === "start" && (
        <>
          <StartScreen
            arr={arr[index]}
            arrlength={arrlength}
            dispatch={dispatch}
            answer={answer}
            index={index}
            totalpoints={totalpoints}
            point={point}
            clock={clock}
          />
        </>
      )}
      {phase === "finish" && (
        <Finish
          point={point}
          totalpoints={totalpoints}
          dispatch={dispatch}
          maxpoint={maxpoint}
        />
      )}
    </div>
  );
}

export default App;
