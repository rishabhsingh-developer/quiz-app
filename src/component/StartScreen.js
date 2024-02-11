import "../startscreen.css";
import Timer from "./Timer";
export default function StartScreen({
  arr,
  arrlength,
  dispatch,
  answer,
  index,
  totalpoints,
  point,
  clock,
}) {
  console.log(arr);
  console.log("rsjflfjsdkl");
  return (
    <div className="startscreen">
      <nav className="nav">
        <progress max={arrlength} value={index} />
        <div className="rangedetail">
          <span>
            Question {index}/{arrlength}
          </span>
          <span>
            {point}/{totalpoints}
          </span>
        </div>
      </nav>
      <main>
        <p className="question">{arr.question}</p>
        <div className="option">
          {arr.options.map((item, index) => {
            return (
              <button
                className={`${answer === index ? "answer" : ""} ${
                  answer !== null
                    ? index === arr.correctOption
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                disabled={answer !== null}
                onClick={() => dispatch({ type: "newAns", payload: index })}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="btn">
          {arrlength - 1 > index ? (
            <button className="next" onClick={() => dispatch({ type: "next" })}>
              Next
            </button>
          ) : (
            <button
              className="next"
              onClick={() => dispatch({ type: "finish" })}
            >
              Finish
            </button>
          )}
          <Timer dispatch={dispatch} clock={clock} />
        </div>
      </main>
    </div>
  );
}
