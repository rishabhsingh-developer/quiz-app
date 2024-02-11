import "../finish.css";
export default function Finish({ point, totalpoints, dispatch, maxpoint }) {
  const percentage = (point / totalpoints) * 100;

  return (
    <>
      <div className="finish">
        <div className="score">
          You Scored {point} out of {totalpoints} ({Math.ceil(percentage)}%)
        </div>
        <span>Maxpoint : {maxpoint}</span>
        <button
          className="restart"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart
        </button>
      </div>
    </>
  );
}
