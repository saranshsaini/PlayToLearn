import React, { useEffect } from "react";
import abcjs from "abcjs";
import "./App.css";

export default function SheetMusic(props) {
  var notes = props.notes;

  var visualObj = useEffect(() => {
    abcjs.renderAbc(
      "paper",
      notes,
      { showDebug: ["grid", "box"], scale: 1.7,  }
    );
  }, []);

  return (
    <div className="sheetmusic_div">
      <div id="paper" className="sheetmusic" />
    </div>
  );
}
