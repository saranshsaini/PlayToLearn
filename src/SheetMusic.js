import React, { useEffect,useState } from "react";
import abcjs from "abcjs";
import "./App.css";

export default function SheetMusic(props) {
  const notes = "K:clef=" + props.clef + " \n L:1/4 \n |" + props.note;
  

  useEffect(() => {
    abcjs.renderAbc("paper", notes, { scale: 1.7 });
  });


  return (
    <div className="sheetmusic_div">
      <div id="paper" className="sheetmusic" />
      
    </div>
  );
}
