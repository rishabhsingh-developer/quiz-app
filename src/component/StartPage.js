import "../startpage.css";
export default function StartPage({ dispatch }) {
  return (
    <header className="startpage">
      <div className="headerwelcome">
        <h2>Welcome to the React Quiz!</h2>
        <h3>question to test your react Mastery!</h3>
        <button onClick={() => dispatch({ type: "start" })}>let's start</button>
        <select
          onChange={(e) =>
            dispatch({ type: "option", payload: e.target.value })
          }
        >
          <option>easy</option>
          <option>hard</option>
          <option>medium</option>
          <option>All question</option>
        </select>
      </div>
    </header>
  );
}
