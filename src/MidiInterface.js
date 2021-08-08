import React, { useEffect, useState } from "react";
import Game from "./Game";
import miditoabcmap from "./miditoabc";
import "./App.css";

export default function MidiInterface() {
  var midi;
  var inputs;
  const BEGINNOTE = 144;

  const [note, setNote] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [numPressed, setNumPressed] = useState(0);
  const [gameAllowed, setGameAllowed] = useState(true);
  const [midiAllowed, setMidiAllowed] = useState(true);

  useEffect(() => {
    connectmidi();
  }, []);

  function connectmidi() {
    if (navigator.requestMIDIAccess) {
      //console.log("This browser supports WebMIDI!");
      setMidiAllowed(true);
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      //console.log("WebMIDI is not supported in this browser.");
      setMidiAllowed(false);
    }
  }

  function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    inputs = midiAccess.inputs;
    setGameAllowed(true);
    connectMidiFunctions(midi);
  }

  function connectMidiFunctions() {
    inputs.forEach((entry) => (entry.onmidimessage = onMIDIMessage));
  }

  function onMIDIMessage(event) {
    console.log(event.data);
    changeNote(event.data);
  }

  function changeNote(n) {
    const note = n[1];
    if (n[0] === BEGINNOTE) {
      setNumPressed((prev) => prev + 1);
      setNote(miditoabcmap[note]);
    }
  }

  function onMIDIFailure() {
    //console.log("Could not access your MIDI devices.");
    setGameAllowed(false);
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <div className="sheetholder">
      {!midiAllowed && (
        <div className="error">
          <h1>It looks like this browser doesn't allow for midi input...</h1>
          <p>
            Currently, only Chrome and Edge have MIDI Input capability supported
            in the browser.
          </p>
          <button onClick={refresh}>Try Again</button>
        </div>
      )}
      {midiAllowed && !gameAllowed && (
        <div className="error">
          <h1>It looks like you denied MIDI input in the browser...</h1>
          <button onClick={refresh}>Try Again</button>
        </div>
      )}
      {midiAllowed && gameAllowed && !gameOver && (
        <Game
          setGameOver={() => setGameOver(true)}
          inputNote={note}
          numPressed={numPressed}
          changeInput={()=>setNote("")}
        />
      )}
      {gameOver && <h1>Over</h1>}
    </div>
  );
}
