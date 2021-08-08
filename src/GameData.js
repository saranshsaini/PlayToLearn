import React from "react";

export default function GameData(props) {
  const { total, curr, numPressed } = props;
  const accuracy =
    numPressed > 0 ? ((curr / numPressed) * 100).toFixed(2) : "--";
  return (
    <div className={"dataBox " + (props.final && "gameover")}>
      <h1>Game Stats:</h1>
      {!props.final && (
        <p>
          <strong>
            <u>Progress: </u>
          </strong>
           {curr} played, {total - curr} notes remaining
        </p>
      )}
      <p>
        <strong>
          <u>Accuracy:</u>
        </strong>{" "}
        {accuracy}%{" "}
      </p>
      <p>
        <strong>
          <u>Incorrect:</u>
        </strong>{" "}
        {numPressed - curr}
      </p>
      {props.final && (
        <button onClick={() => window.location.reload()}>Start Again</button>
      )}
    </div>
  );
}
